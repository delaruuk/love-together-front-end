import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import Image from "next/image";
import PillButtonLink from "ui/Links/PillButtonLink";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "ui/Text/RegularText";
import PricingChoice from "./pricingComponent";


import { useEffect } from "react";
import { handleReveal } from "ui/Animation/useAnimateRevealUp";
import { IRevealElement } from "ui/Animation/types";


const halfHeart = require("assets/half-heart-secondary.png");
const bannerImg = require("assets/banner.png");
const logoImage = require("assets/logo.png");
const textLogoImage = require("assets/text-logo.svg");

const pricingOptions = [
  {
    name: 'Freemium',
    price: '$0',
    pillars: '2 Pillars',
    description: 'Suitable for beginners looking to try the app with no commitment.',
    linkUrl: '/freemium',
    // banner: 'Try For Free'
  },
  {
    name: 'Plus',
    price: '$4.99',
    pillars: '4 Pillars',
    description: 'Suitable for those looking to dip their toes into self development & exporation.',
    linkUrl: '/plus',
  },
  { 
    name: 'Premium',
    price: '$19.99',
    pillars: '18 Pillars',
    description: 'Suitable for those looking to implement the Love Roadmap into their daily lives.',
    linkUrl: '/premium',
  },
  {
    name: 'Marriage & Relationship',
    price: '$6.99',
    pillars: '1 Pillar',
    description: 'Suitable for those looking to specifically improve their marriage or relationship.',
    linkUrl: '/m&r',
  },
  {
    name: 'Advanced',
    price: '$9.99',
    pillars: '8 Pillars',
    description: 'Suitable for those looking to commit to bettering themselves and their relationships.',
    linkUrl: '/advanced',
    // banner: 'Reccomended'
    
  }
];


const Index: NextPageWithLayout = () => {
      useEffect(() => {
        const animateBoxElems = document.querySelectorAll(
            ".animateBox"
        ) as NodeListOf<IRevealElement>;
    
        const onScroll = () => {
          animateBoxElems.forEach((elem) => {
            handleReveal(elem, 'box', 70);
          });
        };
    
        window.addEventListener("scroll", onScroll);
    
        return () => {
          window.removeEventListener("scroll", onScroll);
        };
      }, []);
	return (
    <div className="flex flex-col w-screen h-auto">

      <div className="bg-main"style={{ height: '93vh'}}>
        <div className="absolute right-5 top-5">     
            <Image
                className="pt-1 mr-2"
                priority
                src={textLogoImage}
                alt="Love Together"
                width={250}
            />
        </div>
        <div className="absolute flex-col animateBox" style={{ left: '60%' , top: '35%' }}>
          {pricingOptions.map((option) =>
          option.name === "Advanced" &&
          <PricingChoice
            key={option.name}
            name={option.name}
            price={option.price}
            pillars={option.pillars}
            description={option.description}
            linkUrl={option.linkUrl}
            banner={option.banner} 
          />
          )}
        </div> 
        <div className="flex flex-row" style={{ marginTop:"10%", marginLeft:"5%" }}>      
          <Image 
            style={{ objectFit: 'contain', marginLeft:"2%" }}
            src={halfHeart} alt="half-heart-pink"
            height={75} width={75}
          />

          <LandingPageTitle 
            className="text-white mt-7 mb-10" 
            style={{ fontWeight: 900, transform: 'translateX(-5%)'}} 
            text="Build a Better Forever" 
          />
        </div>   
        <RegularText 
          className="py-4 text-black text-left" 
            style={{ fontWeight: 50, fontSize: '1.5vw', marginLeft: "12%" }
          }>

            Select your plan to uncover deep insights<br /> about yourself and your partner to<br /> understand each other&apos;s needs and nurture<br /> yourself and your bond.
        
        </RegularText> </div>

        <h1 className="text-border text-5xl" style={{ position: 'absolute', color: 'white', right: '50%', top: '90%', zIndex: 2 }}>OR</h1>

      <div className=" bg-black " style={{ height: '80vh', position: 'relative' }}>
         <div className="self-end absolute" style={{ bottom: '15%', right: '5%', zIndex: 0 }}>
          <Image 
            style={{ objectFit: 'contain', transform:'scaleX(-1)', left: '120%', top: '40%' }}
            src={halfHeart} alt="half-heart-secondary" 
            height={75} width={75}
          />  
         </div>
        <div className="animateBox flex p-10 gap-10" style={{ top: '10%', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
           {pricingOptions.map((option, index) => 
           index <= 3 &&
          <PricingChoice
            key={option.name}
            name={option.name}
            price={option.price}
            pillars={option.pillars}
            description={option.description}
            linkUrl={option.linkUrl}
            variant={index === 3 ? "secondary" : "default"}
          />
         )}
        </div>
      </div>
    </div>
  );
};


export default Index;
