import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import Image from "next/image";
import PillButtonLink from "ui/Links/PillButtonLink";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "ui/Text/RegularText";

import { useEffect } from "react";
import { handleReveal } from "ui/Animation/useAnimateRevealUp";
import { IRevealElement } from "ui/Animation/types";

const phoneImage = require("assets/phone-screen-1.png");

const Index1: NextPageWithLayout = () => {
	useEffect(() => {
		const animateBoxElems = document.querySelectorAll(
			".animateBox"
		) as NodeListOf<IRevealElement>;

		const onScroll = () => {
			animateBoxElems.forEach((elem) => {
				handleReveal(elem, "box", 70);
			});
		};

		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div className="max-height-full height-full">
			<div
				className="absolute animateBox"
				style={{
					right: "5vw",
					bottom: "0",
					backgroundColor: "rgba(255, 255, 255, 0.5)",
					backgroundBlendMode: "lighten",
					borderRadius: "15px 15px 0px 0px",
					boxSizing: "border-box",
					padding: "2% 2% 0%",
				}}
			>
				<Image
					className=""
					src={phoneImage}
					alt="phone-screen"
					height={300}
					width={300}
				/>
			</div>
			<div
				className="relative left-0 h-full p-4 flex flex-col justify-between items-start first-of-type:[&>a]:mb-4"
				style={{ marginTop: "10%", marginLeft: "5%" }}
			>
				<LandingPageTitle
					className="text-white mb-10"
					style={{ fontWeight: 900 }}
					text="Customized Love Roadmap"
				/>
				<RegularText
					className="py-4 text-left"
					style={{ fontWeight: 50, fontSize: "2vw", marginBottom: "10vh" }}
				>
					Our 18-pillar assessment unveils compatibility,
					<br /> offering tailored insights to fortify your bond.
				</RegularText>
				<PillButtonLink
					className="text-2xl"
					variant="white-pill"
					link="/sign-up"
					text="Try for Free"
				/>
			</div>
		</div>
	);
};

export default Index1;
