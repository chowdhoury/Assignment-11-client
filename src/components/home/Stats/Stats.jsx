import React from "react";
import { BookOpen, Users, ShoppingBag, Star } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      count: "10,000+",
      label: "Books Available",
    },
    {
      icon: <Users className="w-10 h-10" />,
      count: "5,000+",
      label: "Happy Readers",
    },
    {
      icon: <ShoppingBag className="w-10 h-10" />,
      count: "15,000+",
      label: "Books Sold",
    },
    {
      icon: <Star className="w-10 h-10" />,
      count: "4.8",
      label: "Average Rating",
    },
  ];

  return (
    <div className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Achievements
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Numbers that speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex justify-center text-primary mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.count}
              </div>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
