import React from "react";
import { BookOpen, Users, Heart, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Vast Collection",
      description:
        "Access thousands of books across multiple genres and categories",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community Driven",
      description:
        "Connect with fellow readers and share your reading experience",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Wishlist & Save",
      description:
        "Create your wishlist and save your favorite books for later",
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Best Deals",
      description:
        "Get the best prices and exclusive deals on your favorite books",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Why Choose Boimela?
          </h2>
          <p className="text-secondary-content max-w-2xl mx-auto">
            Discover what makes Boimela the perfect destination for book lovers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary-content">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
