import { useEffect, useRef, useState } from "react";
import Header from "ui/Header/Header";
import Hero from "ui/Landing/Hero";
import Insights from "ui/Landing/Insights";
import Communicate from "ui/Landing//Communicate";
import Divider from "ui/Landing/Divider";
import Discovery from "ui/Landing/Discovery";
import TryFree from "ui/Landing/TryFree";
import Footer from "ui/Landing/Footer";

// import Landing from "./landing";
// import WhoWeAre from "./who-we-are";
// import PlatformFeatures from "./platform-features";
// import Head from "./landing/components/Head";
// import Discovery from "./landing/components/Discovery";
// import Communicate from "./landing/components/Communicate";
// import Divider from "./landing/components/Divider";
// import Insights from "./landing/components/Insights";
// import Foot from "./landing/components/Foot";
// import Footer from "./landing/components/Footer";

const Index = () => {
	// const [animate, setAnimate] = useState<boolean>(false);
	// const [animateSecondary, setAnimateSecondary] = useState<boolean>(false);
	// useEffect(() => {
	// 	setAnimate(true);
	// }, []);
	// useEffect(() => {
	// 	if (animate === true) {
	// 		setTimeout(() => setAnimateSecondary(true), 1000);
	// 	}
	// }, [animate]);

	return (
		<>
			<Header />
			<main>
				<Hero />
				<Insights />
				<Communicate />
				<Divider />
				<Discovery />
				<TryFree />
				<Footer />
			</main>
		</>
		// <div className="flex flex-col overflow-hidden">
		// 	<div className="fixed min-w-full" style={{ zIndex: 5 }}>
		// 		<Header />
		// 	</div>
		// 	<div
		// 		className={`w-screen relative border-0${
		// 			animateSecondary ? "opacity-100" : "opacity-0"
		// 		} transition-opacity ease-in-out duration-500 bg-main`}
		// 		style={{ height: "90vh" }}
		// 	>
		// 		<Head />
		// 	</div>
		// 	<div
		// 		className={`w-screen${
		// 			animateSecondary ? "opacity-100" : "opacity-0"
		// 		} transition-opacity ease-in-out duration-500 bg-secondary-white`}
		// 		style={{ height: "70vh" }}
		// 	>
		// 		<Insights />
		// 	</div>
		// 	<div
		// 		className={`w-screen${
		// 			animateSecondary ? "opacity-100" : "opacity-0"
		// 		} transition-opacity ease-in-out duration-500 bg-white`}
		// 		style={{ height: "70vh" }}
		// 	>
		// 		<Communicate />
		// 	</div>
		// 	<div
		// 		className={`w-screen${
		// 			animateSecondary ? "opacity-100" : "opacity-0"
		// 		} transition-opacity ease-in-out duration-500 bg-main`}
		// 		style={{ height: "25vh" }}
		// 	>
		// 		<Divider />
		// 	</div>
		// 	<div
		// 		className={`w-screen${
		// 			animateSecondary ? "opacity-100" : "opacity-0"
		// 		} transition-opacity ease-in-out duration-500 bg-secondary-white`}
		// 		style={{ height: "70vh" }}
		// 	>
		// 		<Discovery />
		// 	</div>
		// 	<div
		// 		className={`w-screen${
		// 			animateSecondary ? "opacity-100" : "opacity-0"
		// 		} transition-opacity ease-in-out duration-500 bg-black`}
		// 		style={{ height: "80vh" }}
		// 	>
		// 		<Foot />
		// 	</div>
		// 	<div
		// 		className={`w-screen${
		// 			animateSecondary ? "opacity-100" : "opacity-0"
		// 		} transition-opacity ease-in-out duration-500 bg-white`}
		// 		style={{ height: "25vh" }}
		// 	>
		// 		<Footer />
		// 	</div>
		// </div>
	);
};

export default Index;
