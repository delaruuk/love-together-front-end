import Link from "next/link";
import Image from "next/image";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "../Text/RegularText";
import SectionWrapper from "./SectionWrapper";
import ActionColumn from "./ActionColumn";

const phoneImage = require("assets/phone-screen-2.png");
const halfHeart = require("assets/half-heart-pink.png");

type DiscoveryProps = {};

const Discovery = (props: DiscoveryProps) => {
	return (
		<SectionWrapper sectionClassName="bg-secondary-white">
			<ActionColumn
				textColor="black"
				titleText="Self-Discovery"
				detailsText="Gain a deeper understanding of your own strengths, weaknesses, and values, and how they impact your relationship."
				isLinkButton={false}
				linkText="Discover yourself, Sign Up"
			/>
			<div className="flex items-end relative">
				<Image
					className="absolute w-[170px] md:w-[200px] right-[190px] md:right-[240px] z-1"
					src={halfHeart}
					alt="half-heart"
					width={200}
				/>
				<Image
					className="z-0 w-[250px] md:min-w-[300px] md:w-[300px]"
					src={phoneImage}
					alt="phone-screen"
					width={300}
				/>
			</div>
		</SectionWrapper>
	);
};

export default Discovery;
