import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarker,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-primary relative mt-40">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 bg-base-200 w-[95%] lg:w-8/12 lg:mx-auto px-10 py-8 rounded-2xl items-center absolute left-1/2  -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="flex-1">
          <h1 className="font-black text-secondary text-3xl text-center md:text-start mb-5 md:mb-0 md:text-[40px] ">
            Subscribe Our Newsletter
          </h1>
          <p className="text-secondary-content text-center lg:text-left">
            Get helpful updates and insights sent straight to your inbox.
          </p>
        </div>
        <div className="flex-1 flex">
          <input
            className="bg-base-100 w-full px-4 py-4 h-12 rounded-l-sm focus:outline-none"
            type="email"
            name=""
            id=""
            placeholder="Enter your email"
          />
          <button className="bg-primary text-white px-6 py-4 h-12 rounded-r-sm hover:bg-secondary duration-400 flex items-center justify-center">
            <span>Subscribe</span>
          </button>
        </div>
      </div>
      <div className="flex w-[95%] flex-col md:flex-row lg:w-4/5 mx-auto justify-between pt-40 md:pt-30 pb-16 gap-15 text-white text-center md:text-left">
        <div className="flex-1 flex flex-col gap-5">
          <figure className="justify-items-center md:justify-items-start">
            <Logo textSize="text-3xl" />
          </figure>
          <p>
            Boimela brings elegance to every page, offering smart and intuitive
            solutions for book lovers.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <span className="bg-secondary p-3 duration-400 text-white hover:bg-white hover:text-primary cursor-pointer rounded-sm">
              <FaFacebookF />
            </span>
            <span className="bg-secondary p-3 duration-400 text-white hover:bg-white hover:text-primary cursor-pointer rounded-sm">
              <FaInstagram />
            </span>
            <span className="bg-secondary p-3 duration-400 text-white hover:bg-white hover:text-primary cursor-pointer rounded-sm">
              <FaXTwitter />
            </span>
            <span className="bg-secondary p-3 duration-400 text-white hover:bg-white hover:text-primary cursor-pointer rounded-sm">
              <FaLinkedinIn />
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-secondary font-bold text-xl">Legal</h2>
          <a className="hover:text-secondary font-medium duration-400" href="">
            Terms & Conditions
          </a>
          <a className="hover:text-secondary font-medium duration-400" href="">
            Privacy Policy
          </a>
          <a className="hover:text-secondary font-medium duration-400" href="">
            Cookie Policy
          </a>
          <a className="hover:text-secondary font-medium duration-400" href="">
            Refund Policy
          </a>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-secondary font-bold text-xl">Support</h2>
          <a className="hover:text-secondary font-medium duration-400" href="">
            Help Center
          </a>
          <a className="hover:text-secondary font-medium duration-400" href="">
            FAQs
          </a>
          <a className="hover:text-secondary font-medium duration-400" href="">
            Community
          </a>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-secondary font-bold text-xl">Contact</h2>
          <span className="flex items-start gap-2 ">
            <FaMapMarker />
            <span>15 Orchard View, #09-03, Singapore 238890</span>
          </span>
          <span className="flex items-center gap-2 justify-center md:justify-start">
            <FaPhone />
            <span>+0 12345 67890</span>
          </span>
          <span className="flex items-center gap-2 justify-center md:justify-start">
            <IoIosMail />
            <span>info@boimela.com</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
