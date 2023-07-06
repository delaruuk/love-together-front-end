import Link from "next/link";
import LandingLink from "../Links/LandingLink";
import PillButtonLink from "../Links/PillButtonLink";
import LandingPageTitle from "../Text/LandingPageTitle";
import RegularText from "../Text/RegularText";

type ActionColumnProps = {
	divClassName?: string;
	textColor: "white" | "black";
	titleText: string;
	detailsText: string;
	isLinkButton: boolean;
	linkText: string;
};

const ActionColumn = ({
	divClassName,
	textColor,
	titleText,
	detailsText,
	isLinkButton,
	linkText,
}: ActionColumnProps) => {
	const chooseTextColor = () => {
		if (textColor === "white") {
			return "!text-white";
		} else if (textColor === "black") {
			return "!text-black";
		}
	};

	return (
		<div
			className={`flex flex-col items-center md:items-start ${divClassName}`}
		>
			<LandingPageTitle
				className={`text-center md:text-start !text-3xl md:!text-5xl ${chooseTextColor()}`}
				text={titleText}
			/>
			<RegularText
				className={`py-8 md:py-16 max-w-xs md:max-w-md text-center md:text-start text-regular md:text-lg ${chooseTextColor()}`}
			>
				{detailsText}
			</RegularText>
			<LandingLink buttonLink={isLinkButton} text={linkText} />
		</div>
	);
};

export default ActionColumn;
