import { Link } from "react-router";
import { BiHomeAlt } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-base text-gray-500">
            Don't worry, even the best explorers get lost sometimes!
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-64 h-64 md:w-80 md:h-80"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Book Icon */}
            <rect
              x="50"
              y="60"
              width="100"
              height="80"
              rx="5"
              fill="#3B82F6"
              opacity="0.2"
            />
            <rect
              x="55"
              y="65"
              width="90"
              height="70"
              rx="3"
              fill="#3B82F6"
              opacity="0.4"
            />
            <line
              x1="100"
              y1="65"
              x2="100"
              y2="135"
              stroke="#1E40AF"
              strokeWidth="2"
            />
            <circle cx="100" cy="100" r="20" fill="#EF4444" opacity="0.8" />
            <line
              x1="90"
              y1="100"
              x2="110"
              y2="100"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <BiHomeAlt className="text-2xl" />
            Back to Home
          </Link>
          <Link
            to="/books"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl border-2 border-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            Browse Books
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-sm text-gray-500">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:support@library.com"
              className="text-blue-600 hover:underline"
            >
              support@library.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
