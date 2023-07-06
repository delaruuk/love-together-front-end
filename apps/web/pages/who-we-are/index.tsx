import type { NextPageWithLayout } from "models";
import { useEffect, useRef } from "react";
import { handleReveal } from "ui/Animation/useAnimateRevealUp";
import { IRevealElement } from "ui/Animation/types";
import React from "react";

const WhoWeAre: NextPageWithLayout = () => {
  useEffect(() => {
    const animateTextElems = document.querySelectorAll(
      ".animateText"
    ) as NodeListOf<IRevealElement>;
	const animateBoxElems = document.querySelectorAll(
		".animateBox"
	) as NodeListOf<IRevealElement>;

    const onScroll = () => {
      animateTextElems.forEach((elem) => {
		// passing _, variant, reveal point integer 
        handleReveal(elem, 'text', 70);
      });

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
	<div className="relative w-full h-full bg-black">
			<div className="relative h-full w-auto bg-black text-white text-center">
				PROMO PHOTO TO GO HERE
			<div className="who-we-are-box rounded-xl animateBox" style = {{ left: "70%", top: "5%" }}>
				<div className="who-we-are-text justify-center">
					{/* WHO WE ARE */}
					<h1 className="text-xl mb-5 animateText" style={{ fontWeight: 900 }}>
						Who We Are
					</h1>
					{/* VISION */}
					<h2 className="text-l animateText">Vision</h2>
					<p className="mb-2 mt-1 text-sm animateText">
						Help couples build lasting, fulfilling relationships through
						personalized insights and guidance
					</p>
					{/* MISSION */}
					<h2 className="text-l animateText">Mission</h2>
					<p className="mb-2 mt-1 text-sm animateText">
						Our goal is to improve the lives of our customers by providing them
						with a tool that offers the opportunity to build healthy and lasting
						relationships.
					</p>
					{/* VALUES */}
					{/* <h2 className="text-l animateText">Values</h2>
					<p className="mb-2 mt-1 text-sm animateText">
						Empathy, communication, collaboration, growth, and trust
					</p> */}
			</div>
			</div>
			</div>
	</div>
   
  );
};


export default WhoWeAre;