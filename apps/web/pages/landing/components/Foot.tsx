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

const logoImage = require("assets/logo.png");
const textLogoImage = require("assets/text-logo.svg");

const bwCouplePhoto = require("assets/bw-landing-photo.jpg");
  
  
const Index6: NextPageWithLayout = () => {
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
            <div className="flex flex-col w-md"> 
              <div className="flex flex-row mt-10 ml-5">
                  <div className="ml-2">
                      <Image
                          priority
                          src={logoImage}
                          alt="Love Together"
                          width={70}
                          height={70}
                      />
                  </div>
                  <div>
                          <Image
                              className="pt-1 ml-2"
                              priority
                              src={textLogoImage}
                              alt="Love Together"
                              width={250}
                          />
                  </div>
              </div>
              <Image
                className="pb-10 animateBox"
                style={{ objectFit: "cover", paddingLeft: '20%', paddingTop: '10%' }}
                priority
                src={bwCouplePhoto}
                alt="bwCouplePhoto"
                width={900}
                // height={300}
              />
            </div>
            <div className="flex justify-center items-center w-1/4">
            </div>
        <div className="flex flex-col justify-center items-end p-4 w-3/4"style={{ alignItems: 'flex-start'}}>
          <LandingPageTitle className="text-white mb-5" style={{ fontWeight: 900 }} text="Try LoveTogether Today" />
          <RegularText className="py-4 text-white text-left" style={{ fontWeight: 50, fontSize: '2vw', marginBottom: "5vh" }}>
           Experience the benefits of LoveTogether&apos;s Love<br />Roadmap with our freemium package, and unlock the<br />full potential of your relationship with our premium<br />offerings.
          </RegularText>
          <PillButtonLink
            className="text-2xl text-black"
            variant="white-pill"
            link="/sign-up"
            text="Try for Free"
          />
        </div>
      </div>
    );
};
export default Index6;
