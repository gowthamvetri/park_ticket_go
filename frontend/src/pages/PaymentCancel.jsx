import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentCancel = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const billId = searchParams.get('bill_id');

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="bg-red-100 rounded-full p-6">
                        <svg
                            className="w-20 h-20 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
                    <p className="text-gray-600 text-lg">
                        Your payment was cancelled. The bill remains unpaid.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 w-full">
                        <p className="text-sm text-yellow-800">
                            <strong>Important:</strong> You must complete the payment before you can exit the parking lot.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 w-full mt-4">
                        <button
                            onClick={() => navigate(`/bill/${billId}`)}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Retry Payment
                        </button>
                        <button
                            onClick={() => navigate('/bill')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
                        >
                            View All Bills
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
