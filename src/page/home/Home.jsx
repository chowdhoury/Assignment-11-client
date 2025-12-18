import React from "react";
import HeroSlider from "../../components/home/Hero/HeroSlider";
import WhyUs from "../../components/home/whyus/WhyUs";
import Features from "../../components/home/Features/Features";
import LatestBooks from "../../components/home/LatestBooks/LatestBooks";
import Stats from "../../components/home/Stats/Stats";
import Coverage from "../../components/home/Coverage/Coverage";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <WhyUs />
      <Features />
      <LatestBooks />
      <Stats />
      <Coverage />
    </div>
  );
};

export default Home;
