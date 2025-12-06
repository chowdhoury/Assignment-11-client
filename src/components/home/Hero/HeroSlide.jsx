const HeroSlide = ({ item }) => {
  return (
    <div>
      <img
        src={item}
        className="w-full h-[500px] lg:h-[800px] object-cover"
        alt=""
      />
    </div>
  );
};

export default HeroSlide;
