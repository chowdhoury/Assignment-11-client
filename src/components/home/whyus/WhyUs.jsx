import React from 'react';
import { BiSolidDiscount } from 'react-icons/bi';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';

const WhyUs = () => {
    return (
      <div className="lg:w-4/5 mx-auto my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-base-200 rounded-lg px-6 py-4">
          <div className="flex items-center">
            <figure className="text-white text-5xl bg-primary p-5 rounded-lg mr-4">
              <TbTruckDelivery />
            </figure>
            <div className="lg:border-r border-primary/30 w-full py-2">
              <h2 className="text-[22px] font-bold text-secondary">
                Return and refund
              </h2>
              <p className="text-secondary-content font-medium">
                Money back guarantee
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <figure className="text-white text-5xl bg-primary p-5 rounded-lg mr-4">
              <RiSecurePaymentFill />
            </figure>
            <div className="lg:border-r border-primary/30 w-full py-2">
              <h2 className="text-[22px] font-bold text-secondary">
                Secure Payment
              </h2>
              <p className="text-secondary-content font-medium">
                30% off by subscribing
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <figure className="text-white text-5xl bg-primary p-5 rounded-lg mr-4">
              <MdOutlineSupportAgent />
            </figure>
            <div className="lg:border-r border-primary/30 w-full py-2">
              <h2 className="text-[22px] font-bold text-secondary">
                Quality Support
              </h2>
              <p className="text-secondary-content font-medium">
                Always online 24/7
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <figure className="text-white text-5xl bg-primary p-5 rounded-lg mr-4">
              <BiSolidDiscount />
            </figure>
            <div className="w-full py-2">
              <h2 className="text-[22px] font-bold text-secondary">
                Daily Offers
              </h2>
              <p className="text-secondary-content font-medium">
                20% off by subscribing
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default WhyUs;