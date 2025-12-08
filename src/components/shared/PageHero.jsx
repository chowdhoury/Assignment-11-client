import React from "react";
import bgPattern from "../../assets/bg-p.jpg";

const PageHero = ({ title }) => {
  return (
    <div
      className="w-full h-[250px] relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-base-200/90"></div>
      <div className="relative z-10 text-5xl text-secondary font-black">{title}</div>
      
    </div>
  );
};

export default PageHero;
