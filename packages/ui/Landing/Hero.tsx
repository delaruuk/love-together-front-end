import Image from "next/image";
import PillButtonLink from "ui/Links/PillButtonLink";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "ui/Text/RegularText";

import { useEffect } from "react";
import { handleReveal } from "ui/Animation/useAnimateRevealUp";
import { IRevealElement } from "ui/Animation/types";
import LandingLink from "../Links/LandingLink";
import RegularTextMont from "../Text/RegularTextMont";

const phoneImage = require("assets/phone-screen-1.png");

const Hero = () => {
	return (
		<section className="bg-main">
			<div className="py-10 md:py-0 px-4 max-w-7xl md:h-screen mx-auto flex flex-col md:flex-row gap-10 md:gap-0">
				<div className="flex flex-1 flex-col justify-center items-center md:items-start">
					<LandingPageTitle
						className="text-white text-center md:text-start !text-3xl md:!text-5xl"
						text="Customized Love Roadmap"
					/>
					<RegularText className="max-w-xs md:max-w-md py-8 md:py-16 text-center md:text-start md:text-lg">
						Our 18-pillar assessment unveils compatibility, offering tailored
						insights to fortify your bond.
					</RegularText>
					<div className="flex">
						<LandingLink buttonLink={true} text="Try for Free" />
					</div>
				</div>
				<div className="flex mx-auto md:items-end max-w-[250px] md:max-w-[300px] w-full">
					<div className="p-4 md:p-5 bg-white bg-opacity-50 rounded-2xl animateBox">
						<Image src={phoneImage} alt="phone-screen" width={300} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
