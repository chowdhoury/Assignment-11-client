import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { CheckCircle, Package, ArrowRight, Home, FileText } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log("Session ID:", sessionId);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard/my-orders");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);
  useEffect(() => {
    if (sessionId) {
      fetch(`${import.meta.env.VITE_server_url}/payment-success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json()) // ✅ MUST return
        .then((data) => {
          setOrderDetails(data);
          console.log("Payment verification data:", data);
        })
        .catch((error) => {
          console.error("Error verifying payment:", error);
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with animated checkmark */}
          <div className="bg-linear-to-r from-green-500 to-emerald-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 animate-bounce">
              <CheckCircle
                className="w-16 h-16 text-green-500"
                strokeWidth={2}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-green-100 text-lg">
              Your order has been confirmed
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Success Message */}
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Thank you for your purchase! Your payment has been processed
                successfully.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                Order Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-semibold text-gray-800">
                    {orderDetails?.orderId}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {orderDetails?.transactionId}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Processing
                  </span>
                </div>
              </div>
            </div>

            {/* Auto-redirect notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-800 text-sm">
                Redirecting to your orders in{" "}
                <span className="font-bold text-lg">{countdown}</span>{" "}
                seconds...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Link
                to="/dashboard/my-orders"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Package className="w-5 h-5" />
                View Orders
              </Link>
              <Link
                to="/dashboard/invoices"
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-gray-300"
              >
                <FileText className="w-5 h-5" />
                Invoices
              </Link>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-gray-300"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
            </div>

            {/* Continue Shopping */}
            <div className="text-center pt-4">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors group"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="text-center mt-6 text-gray-600 text-sm">
          <p>
            A confirmation email has been sent to your registered email address.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
