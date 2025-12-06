import React from 'react';
import { LuBookMarked } from 'react-icons/lu';
import { Link } from 'react-router';

const Logo = ({textSize}) => {
    return (
      <span className={`flex items-center ${textSize} gap-1`}>
        <span className="text-white bg-primary rounded-full p-2 ">
          <LuBookMarked />
        </span>
        <Link to="/" className="text-secondary font-black">
          Boi<span className="font-medium">mela</span>
        </Link>
      </span>
    );
};

export default Logo;