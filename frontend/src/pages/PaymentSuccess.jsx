import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const sessionId = searchParams.get('session_id');
    const billId = searchParams.get('bill_id');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/verify-payment',
                    { sessionId },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.data.success) {
                    toast.success('Payment successful! Bill has been paid.');
                    setVerifying(false);
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                toast.error('Error verifying payment');
                setVerifying(false);
            }
        };

        if (sessionId) {
            verifyPayment();
        }
    }, [sessionId]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                {verifying ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
                        <h2 className="text-2xl font-bold text-gray-800">Verifying Payment...</h2>
                        <p className="text-gray-600">Please wait while we confirm your payment</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6">
                        <div className="bg-green-100 rounded-full p-6">
                            <svg
                                className="w-20 h-20 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
                        <p className="text-gray-600 text-lg">
                            Your parking bill has been paid successfully.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 w-full">
                            <p className="text-sm text-gray-500">Transaction ID</p>
                            <p className="text-xs text-gray-700 break-all mt-1">{sessionId}</p>
                        </div>
                        <div className="flex flex-col gap-3 w-full mt-4">
                            <button
                                onClick={() => navigate(`/bill/${billId}`)}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                            >
                                View Bill Details
                            </button>
                            <button
                                onClick={() => navigate('/bill')}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
                            >
                                View All Bills
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
