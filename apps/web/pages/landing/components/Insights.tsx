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

const phoneImage = require("assets/phone-screen-1.png");
const colorCouplePhoto = require("assets/color-landing-photo.jpg");
 
const Index5: NextPageWithLayout = () => {
      useEffect(() => {
        const animateBoxElems = document.querySelectorAll(
            ".animateBox"
        ) as NodeListOf<IRevealElement>;
    
        const onScroll = () => {
          animateBoxElems.forEach((elem) => {
            handleReveal(elem, 'box', 50);
          });
        };
    
        window.addEventListener("scroll", onScroll);
    
        return () => {
          window.removeEventListener("scroll", onScroll);
        };
      }, []);
	return (
    <div className="max-height-full h-full flex relative overflow-hidden">
      <div className="flex flex-row">
        <div className="relative left-0 h-full p-4 items-start flex flex-col" style={{marginTop:"5%", marginLeft:"5%"}}>
            <LandingPageTitle className="text-black mb-5" style={{ fontWeight: 900 }} text="Personalized Insights" />
            <RegularText className="py-4 text-black text-left" style={{ fontWeight: 50, fontSize: '2vw', marginBottom: "5vh" }}>
            Uncover deep insights about yourself and your partner to understand each other&apos;s needs and nurture your bond.
            </RegularText>
            <a href= '/sign-up'>
                <button className="flex items-center text-black font-bold hover:text-secondary" style = {{ fontSize: '1.5em', transition: 'color 0.2s ease-in-out'}} >
                Unlock Insights Today<span className="ml-2">&gt;</span>
                </button>
            </a>
        </div>


        <Image
          className="p-5 animateBox"
          style={{ objectFit: "cover"}}
          priority
          src={colorCouplePhoto}
          alt="colorCouplePhoto"
          width={825}
          // height={300}
        />
      </div>
    </div>
    );
};
export default Index5;
