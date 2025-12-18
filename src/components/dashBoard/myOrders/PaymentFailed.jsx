import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  XCircle,
  RefreshCw,
  Home,
  HelpCircle,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);

  const orderId = searchParams.get("orderId") || "N/A";
  const errorMessage =
    searchParams.get("error") || "Payment could not be processed";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const commonReasons = [
    "Insufficient funds in your account",
    "Incorrect card details or expired card",
    "Payment gateway timeout",
    "Bank declined the transaction",
    "Network connectivity issues",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Failed Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with animated X icon */}
          <div className="bg-linear-to-r from-red-500 to-orange-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 animate-pulse">
              <XCircle className="w-16 h-16 text-red-500" strokeWidth={2} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Payment Failed
            </h1>
            <p className="text-red-100 text-lg">
              We couldn't process your payment
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Error Message */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">
                    Error Details
                  </h3>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            {orderId !== "N/A" && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-4">
                  Transaction Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Order Reference</span>
                    <span className="font-semibold text-gray-800">
                      {orderId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Status</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Failed
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Common Reasons */}
            <div className="bg-amber-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Common Reasons for Payment Failure
              </h3>
              <ul className="space-y-2">
                {commonReasons.map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0"></span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* What to do next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                What to do next?
              </h4>
              <p className="text-blue-800 text-sm">
                Please verify your payment details and try again. If the problem
                persists, contact your bank or try a different payment method.
              </p>
            </div>

            {/* Auto-redirect notice */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
              <p className="text-gray-700 text-sm">
                Redirecting to dashboard in{" "}
                <span className="font-bold text-lg">{countdown}</span>{" "}
                seconds...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-gray-300"
              >
                <Home className="w-5 h-5" />
                Go to Dashboard
              </Link>
            </div>

            {/* Back to Books */}
            <div className="text-center pt-4">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Books
              </Link>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mt-6 text-gray-600 text-sm space-y-2">
          <p>Need help? Contact our support team</p>
          <p className="font-medium text-gray-800">
            support@bookstore.com | 1-800-BOOKS-24
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
