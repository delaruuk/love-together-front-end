import LandingPageTitle from "ui/Text/LandingPageTitle";
import PillButtonLink from "../Links/PillButtonLink";
import RegularText from "../Text/RegularText";
import ActionColumn from "./ActionColumn";
import SectionWrapper from "./SectionWrapper";

import Image from "next/image";

const logoImage = require("assets/logo.png");
const textLogoImage = require("assets/text-logo.svg");

const bwCouplePhoto = require("assets/bw-landing-photo.jpg");

type TryFreeProps = {};

const TryFree = (props: TryFreeProps) => {
	return (
		<SectionWrapper sectionClassName="bg-black">
			<div className=" flex flex-col w-md">
				<div className="flex flex-row">
					<Image
						priority
						src={logoImage}
						alt="Love Together"
						width={70}
						height={70}
					/>
					<Image
						className="pt-1 ml-2"
						priority
						src={textLogoImage}
						alt="Love Together"
						width={250}
					/>
				</div>
				<Image
					className="pt-10 animateBox"
					priority
					src={bwCouplePhoto}
					alt="bwCouplePhoto"
					width={900}
				/>
			</div>
			<ActionColumn
				textColor="white"
				titleText="Try Love Together Today"
				detailsText="Experience the benefits of LoveTogether's Love Roadmap with our freemium package, and unlock the full potential of your relationship with our premium offerings."
				isLinkButton={true}
				linkText="Try for Free"
			/>
		</SectionWrapper>
	);
};

export default TryFree;
