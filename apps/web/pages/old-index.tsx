import Landing from "./landing";
import WhoWeAre from "./who-we-are";
import PlatformFeatures from "./platform-features";

import LandingLayout from "ui/Layouts/LandingLayout";
import LandingLoading from "ui/Loading/LandingLoading";

import { useEffect, useState } from "react";
import { NextPageWithLayout } from "models";
import React from "react";

const Index: NextPageWithLayout = () => {
	const [animate, setAnimate] = useState<boolean>(false);
	const [animateSecondary, setAnimateSecondary] = useState<boolean>(false);

	useEffect(() => {
		setAnimate(true);
	}, []);

	useEffect(() => {
		if (animate === true) {
			setTimeout(() => setAnimateSecondary(true), 1000);
		}
	}, [animate]);

	return (
		<div className="flex flex-col overflow-hidden">
			<LandingLayout>
				<div
					className={`w-screen grid place-items-center ${
						animateSecondary ? "opacity-100" : "opacity-0"
					} transition-opacity ease-in-out duration-500`}
					style={{ height: "90vh" }}
				>
					<Landing />
				</div>
			</LandingLayout>
			{/* WhoWeAre */}
			<div
				className={`w-screen h-full ${
					animateSecondary ? "opacity-100" : "opacity-0"
				} transition-opacity ease-in-out duration-500`}
				style={{ height: "70vh" }}
			>
				<WhoWeAre />
			</div>
			{/* WhoWeAre */}
			{/* PlatformFeatures */}
			<div
				className={`w-screen h-full ${
					animateSecondary ? "opacity-100" : "opacity-0"
				} transition-opacity ease-in-out duration-500`}
				style={{ height: "75em" }}
			>
				<PlatformFeatures />
			</div>
			{/* PlatformFeatures */}
			<LandingLoading animate={animate} />
		</div>
	);
};

export default Index;
