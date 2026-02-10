# Stripe Payment Integration

## Overview
This project now includes Stripe payment integration for parking bills. Users must complete payment through Stripe before they can exit the parking lot.

## Features
- ✅ Secure payment processing via Stripe Checkout
- ✅ Automatic bill status update after successful payment
- ✅ Payment success and cancellation pages
- ✅ Real-time payment verification
- ✅ Webhook support for payment confirmation
- ✅ Payment status displayed on all bill views

## Setup Instructions

### 1. Install Dependencies (Already Done)
```bash
cd backend
npm install stripe
```

### 2. Stripe Credentials (Already Configured)
Your `.env` file already contains:
- `STRIPE_SECRET_KEY` - Your Stripe test secret key
- `STRIPE_WEBHOOK_SECRET` - Your webhook signing secret
- `FRONTEND_URL` - Frontend URL for redirects

### 3. Start the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## How It Works

### Payment Flow
1. **Bill Generation**: Admin generates a bill when vehicle exits
2. **Payment Required**: Bill is created with `ispaid: false`
3. **User Views Bill**: User navigates to bill page and sees "Pay Now" button
4. **Stripe Checkout**: Clicking "Pay Now" redirects to Stripe checkout page
5. **Payment Processing**: User enters card details and completes payment (converted to USD)
6. **Verification**: System verifies payment and updates bill status
7. **Success Page**: User is redirected to success page with confirmation

### Currency Conversion
**Important:** Since Stripe test cards require a minimum of $0.50 USD, the system automatically converts INR amounts to USD:
- Exchange rate used: 1 USD ≈ 83 INR
- Minimum charge: $0.50 USD
- Example: ₹15 bill → $0.50 USD (minimum enforced)
- The original INR amount is displayed in the bill details

For production, you can switch back to INR currency once you're using live mode with proper Indian payment methods.

### Test Cards
Use these test card numbers in Stripe checkout:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Failed Payment:**
- Card: `4000 0000 0000 0002`
- This will simulate a declined payment

## API Endpoints

### Create Checkout Session
```
POST /api/create-checkout-session
Authorization: Bearer <token>
Body: { "billId": "bill_id_here" }
```

### Verify Payment
```
POST /api/verify-payment
Authorization: Bearer <token>
Body: { "sessionId": "stripe_session_id" }
```

### Webhook (Stripe calls this)
```
POST /api/webhook
Headers: stripe-signature
Body: Raw Stripe event
```

## Frontend Routes

- `/bill/:id` - View bill with payment button
- `/payment-success` - Payment successful confirmation
- `/payment-cancel` - Payment cancelled notice

## Database Schema

### Bill Model
```javascript
{
  vehicle: ObjectId,
  user: ObjectId,
  token: ObjectId,
  totalCost: Number,
  ispaid: Boolean (default: false),
  paymentSessionId: String,
  departuredDate: Date
}
```

## Security Features

- JWT authentication required for all payment endpoints
- Stripe webhook signature verification
- Secure payment session handling
- No sensitive card data stored in database

## Webhook Setup (Optional - For Production)

To test webhooks locally:
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhooks:
   ```bash
   stripe listen --forward-to localhost:8080/api/webhook
   ```
3. Use the webhook signing secret provided by Stripe CLI

## Troubleshooting

**"Payment not verified" error:**
- Check that webhook secret is correct
- Verify Stripe API key is valid
- Check server console for webhook events

**Redirect not working:**
- Verify FRONTEND_URL in .env is correct
- Check that frontend is running on the specified port

**Bill status not updating:**
- Check webhook is being received (server logs)
- Verify bill ID is passed correctly in metadata
- Check MongoDB connection

## Production Deployment

Before deploying to production:
1. Replace test Stripe keys with live keys
2. Update FRONTEND_URL to your production domain
3. Set up webhook endpoint in Stripe Dashboard
4. Enable HTTPS for webhook security
5. Add error monitoring (e.g., Sentry)

## Support
For Stripe-related issues, check:
- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Logs: Check payment intent and checkout session logs
- Server Logs: Check for webhook errors and API responses
