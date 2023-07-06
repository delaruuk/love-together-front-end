import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "../Text/RegularText";
import ActionColumn from "./ActionColumn";

const colorCouplePhoto = require("assets/color-landing-photo.jpg");

type InsightsProps = {};

const Insights = (props: InsightsProps) => {
	return (
		<SectionWrapper sectionClassName="bg-secondary-white">
			<ActionColumn
				divClassName="md:w-min"
				textColor="black"
				titleText="Personalized Insights"
				detailsText="Uncover deep insights about yourself and your partner to understand each other's needs and nurture your bond."
				isLinkButton={false}
				linkText="Unlock Insights Today"
			/>
			<div className="flex flex-1 justify-end">
				<Image
					className="w-full max-w-[400px] md:max-w-max animateBox"
					style={{ objectFit: "cover" }}
					priority
					src={colorCouplePhoto}
					alt="colorCouplePhoto"
					width={825}
					// height={300}
				/>
			</div>
		</SectionWrapper>
	);
};

export default Insights;
