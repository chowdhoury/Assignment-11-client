import React from "react";
import { MapPin, Package, Clock, Shield } from "lucide-react";
import DeliveryMap from "./DeliveryMap";

const Coverage = () => {
  const coverageFeatures = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Nationwide Delivery",
      description:
        "We deliver to all major cities and towns across the country",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Safe Packaging",
      description:
        "Every book is carefully packaged to ensure it reaches you in perfect condition",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Shipping",
      description: "Most orders are delivered within 3-5 business days",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Orders",
      description: "Your orders are protected with end-to-end encryption",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Image */}
          <div className="lg:w-1/2">
            <img
              src="https://i.postimg.cc/zGPpRQMJ/paul-melki-b-Byh-Wyd-ZLW0-unsplash.jpg"
              alt="Book delivery coverage"
              className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
            />
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Delivery Coverage
            </h2>
            <p className="text-secondary-content mb-8 text-lg">
              We're committed to bringing your favorite books right to your
              doorstep, wherever you are.
            </p>

            <div className="space-y-6">
              {coverageFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-base-200 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <div className="text-primary mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-content">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Coverage Map Section */}
        <div className="mt-16">
          <DeliveryMap />
        </div>
      </div>
    </div>
  );
};

export default Coverage;
