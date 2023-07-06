import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import Image from "next/image";
import LandingLayout from "ui/Layouts/LandingLayout";
import PillButtonLink from "ui/Links/PillButtonLink";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "ui/Text/RegularText";

import { useEffect } from "react";
import { handleReveal } from "ui/Animation/useAnimateRevealUp";
import { IRevealElement } from "ui/Animation/types";

const phoneImage = require("assets/phone-screen-3.png");
const phoneImage_2 = require("assets/phone-screen-4.png");

const Circle: React.FC = () => {
    return (
      <div
        className="absolute bg-secondary-white rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          position: "absolute",
        //   transform: "translate(10%, 50%)",
          zIndex: 1,
        }}
      ></div>
    );
  };
  
  
const Index3: NextPageWithLayout = () => {
  useEffect(() => {
    const animateBoxElems = document.querySelectorAll(
        ".animateBox"
    ) as NodeListOf<IRevealElement>;

    const onScroll = () => {
      animateBoxElems.forEach((elem) => {
        handleReveal(elem, 'box', 80);
      });
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
	return (
        <div className="max-height-full h-full flex relative overflow-hidden">
            <div className="flex justify-center items-center w-1/2">
            <Image className="absolute animateBox" style={{ left: '8vw', bottom:'15vw', zIndex: 2}}src={phoneImage} alt="phone-screen" height={225} width={225} />  
            <Image className="absolute animateBox" style={{ left: '25vw', bottom:'2vw', zIndex: 2}}src={phoneImage_2} alt="phone-screen" height={225} width={225} />   
            <Circle />
            </div>
        <div className="flex flex-col justify-center  items-end p-4 w-1/2"style={{ alignItems: 'flex-start'}}>
          <LandingPageTitle className="text-black mb-5" style={{ fontWeight: 900 }} text="Connect & Communicate" />
          <RegularText className="py-4 text-black text-left" style={{ fontWeight: 50, fontSize: '2vw', marginBottom: "5vh" }}>
            Add your partner and instantly unlock insights into<br />each other&apos;s thoughts and feelings.
          </RegularText>
          <a href= '/sign-up'>
            <button className="flex items-center text-black font-bold hover:text-secondary" style = {{ fontSize: '1.5em', transition: 'color 0.2s ease-in-out'}}>
              Start Growing Together<span className="ml-2">&gt;</span>
            </button>
          </a>
        </div>
      </div>
    );
};
export default Index3;