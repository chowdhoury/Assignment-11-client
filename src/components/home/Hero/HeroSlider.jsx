import { Link } from "react-router";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Logo from "../../shared/Logo";
import HeroSlide from "./HeroSlide";

const HeroSlider = () => {
  const slide = [
    "https://i.postimg.cc/SK2dLrFC/inaki-del-olmo-NIJu-EQw0RKg-unsplash.jpg",
    "https://i.postimg.cc/ZqBHPctM/jessica-ruscello-OQSCtab-Gk-SY-unsplash.jpg",
    "https://i.postimg.cc/TPL0j9ML/luisa-brimble-Vf-Ho-MBag-DPc-unsplash.jpg",
    "https://i.postimg.cc/zGPpRQMJ/paul-melki-b-Byh-Wyd-ZLW0-unsplash.jpg",
    "https://i.postimg.cc/DzJ6Qgk8/ryunosuke-kikuno-FKqx-Z58b-Vj-U-unsplash.jpg",
    "https://i.postimg.cc/VNrg9RQ9/susan-q-yin-2JIvbo-GLeho-unsplash.jpg",
  ];


  return (
    <div className="relative">
      <div className="flex flex-col justify-center items-center text-center text-white absolute z-10 w-full h-full top-0 left-0 bg-[#FF7B6B]/30">
        <div className="max-w-3xl px-4">
          <div className="flex justify-center gap-4">
            <figure className="bg-base-200/50 p-2 rounded-full">
              <Logo textSize="text-3xl" />
            </figure>
          </div>
          <h1 className="font-extrabold lg:text-[70px] md:text-[50px] text-[30px] leading-tight">
            Get Your New Book
            <br />
            The Best Price
          </h1>

          <p className="my-3 md:my-8 ">
            Boimela brings elegance and purpose together — where meaningful stories meet everyday inspiration. Every book is selected to enrich your journey, blending depth with simplicity. With Boimela, experience a reading life that feels as natural as it is refined.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/books"
              className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg font-semibold duration-400"
            >
              Books
            </Link>
            {/* <Link to="/request" className="border-2 border-white text-white hover:bg-primary  px-7 py-3.5 hover:border-primary rounded-lg font-semibold transition-all duration-300">
              Request
            </Link> */}
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper bg-base-300"
      >
        {slide.map((item, index) => (
          <SwiperSlide key={index}>
            <HeroSlide item={item}></HeroSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
