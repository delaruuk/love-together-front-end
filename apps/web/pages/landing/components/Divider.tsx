import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import Image from "next/image";
import LandingLayout from "ui/Layouts/LandingLayout";
import PillButtonLink from "ui/Links/PillButtonLink";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "ui/Text/RegularText";

const logoImage = require("assets/logo.png");

const Index4: NextPageWithLayout = () => {
	return (
		<div className="max-height-full h-full justify-center flex overflow-hidden items-center ">
			<RegularText
				className="py-4 text-white text-left"
				style={{ fontSize: "1.5em" }}
			>
				Our app identifies key areas for conversation, empowering you both to
				<br />
				navigate your relationship&apos;s path to success.
				<br />
				<br />
				Strengthen your bond and create lasting happiness together.
			</RegularText>
		</div>
	);
};

export default Index4;
