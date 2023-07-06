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

const phoneImage = require("assets/phone-screen-2.png");
const halfHeart = require("assets/half-heart-pink.png");

const Index2: NextPageWithLayout = () => {
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
		<div className="max-height-full h-full flex relative overflow-hidden">
			<div
				className="absolute animateBox"
				style={{
					right: "5vw",
					bottom: "0",
					zIndex: 2,
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
				className="relative left-0 h-full p-4 items-start flex flex-col"
				style={{ marginTop: "10%", marginLeft: "5%" }}
			>
				<LandingPageTitle
					className="text-black mb-5"
					style={{ fontWeight: 900 }}
					text="Self-Discovery"
				/>
				<RegularText
					className="py-4 text-black text-left"
					style={{ fontWeight: 50, fontSize: "2vw", marginBottom: "5vh" }}
				>
					Gain a deeper understanding of your own strengths,
					<br /> weaknesses, and values, and how they impact your <br />
					relationship.
				</RegularText>
				<a href="/sign-up">
					<button
						className="flex items-center text-black font-bold hover:text-secondary"
						style={{ fontSize: "1.5em", transition: "color 0.2s ease-in-out" }}
					>
						Discover yourself, Sign Up<span className="ml-2">&gt;</span>
					</button>
				</a>
			</div>
			<Image
				style={{ objectFit: "contain", marginLeft: "8vw", marginTop: "35vh" }}
				src={halfHeart}
				alt="half-heart"
				height={200}
				width={200}
			/>
		</div>
	);
};
export default Index2;
