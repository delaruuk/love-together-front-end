import React from "react";
import Image from "next/image";

const logoImage = require("assets/logo.png");
const textLogoImage = require("assets/text-logo.svg");

type LandingLoadingProps = {
  animate: boolean;
};

const LandingLoading: React.FC<LandingLoadingProps> = ({ animate }) => {
  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 w-full h-full grid place-items-center ${
        animate ? "opacity-0" : "opacity-100"
      } transition-opacity ease-in-out duration-1000`}
    >
      <Image
        priority
        src={logoImage}
        alt="Love Together - Home"
        width={300}
        height={300}
      />
    </div>
  );
};

export default LandingLoading;