import Stripe from "stripe";
import Bill from "../model/Bill.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { billId } = req.body;

        const bill = await Bill.findById(billId).populate('vehicle').populate('user');

        if (!bill) {
            return res.status(404).json({
                message: "Bill not found",
                error: true,
                success: false
            });
        }

        if (bill.ispaid) {
            return res.status(400).json({
                message: "Bill already paid",
                error: true,
                success: false
            });
        }

        // Stripe requires minimum $0.50 for test cards
        // Convert INR to USD (approximate rate: 1 USD = 83 INR)
        const amountInUSD = Math.max(0.50, (bill.totalCost / 83));
        const stripeAmount = Math.round(amountInUSD * 100); // Convert to cents

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Parking Bill - ${bill.vehicle.vno}`,
                            description: `Parking charges for vehicle ${bill.vehicle.vno} (${bill.vehicle.vmodel}) - ₹${bill.totalCost} (≈$${amountInUSD.toFixed(2)} USD)`,
                        },
                        unit_amount: stripeAmount, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success?session_id={CHECKOUT_SESSION_ID}&bill_id=${billId}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-cancel?bill_id=${billId}`,
            metadata: {
                billId: billId.toString(),
                originalAmount: bill.totalCost.toString(),
                currency: 'INR'
            },
        });

        return res.status(200).json({
            message: "Checkout session created successfully",
            error: false,
            success: true,
            data: {
                sessionId: session.id,
                url: session.url
            }
        });

    } catch (error) {
        console.error("Stripe checkout error:", error);
        return res.status(500).json({
            message: "Payment processing error: " + error.message,
            error: true,
            success: false,
            details: error.type || 'Unknown error'
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const billId = session.metadata.billId;
            
            await Bill.findByIdAndUpdate(billId, {
                $set: { ispaid: true }
            }, { new: true });

            return res.status(200).json({
                message: "Payment verified and bill updated",
                error: false,
                success: true,
                data: { paymentStatus: session.payment_status }
            });
        }

        return res.status(400).json({
            message: "Payment not completed",
            error: true,
            success: false
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error: " + error.message,
            error: true,
            success: false
        });
    }
};

export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            
            if (session.payment_status === 'paid') {
                const billId = session.metadata.billId;
                await Bill.findByIdAndUpdate(billId, {
                    $set: { ispaid: true }
                }, { new: true });
                console.log(`Payment successful for bill: ${billId}`);
            }
            break;

        case 'payment_intent.succeeded':
            console.log('Payment intent succeeded');
            break;

        case 'payment_intent.payment_failed':
            console.log('Payment intent failed');
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};
