import Link from "next/link";
import Image from "next/image";
import LandingPageTitle from "ui/Text/LandingPageTitle";
import RegularText from "../Text/RegularText";
import SectionWrapper from "./SectionWrapper";

const phoneImage = require("assets/phone-screen-3.png");
const phoneImage_2 = require("assets/phone-screen-4.png");

type CommunicateProps = {};

const Communicate = (props: CommunicateProps) => {
	return (
		<SectionWrapper sectionClassName="bg-white">
			<div className="flex-1 justify-start bg-red-500">
				<div
					className="min-w-full aspect-square bg-secondary-white rounded-full"
					style={
						{
							//   transform: "translate(10%, 50%)",
						}
					}
				></div>
				{/* <div className="flex justify-center items-center w-1/2">
						<Image
						className="animateBox"
						style={{ left: "8vw", bottom: "15vw", zIndex: 2 }}
						src={phoneImage}
						alt="phone-screen"
						// height={225}
						width={225}
						/>
						<Image
						className="animateBox"
						style={{ left: "25vw", bottom: "2vw", zIndex: 2 }}
						src={phoneImage_2}
						alt="phone-screen"
						// height={225}
						width={225}
						/>
						<div
						className="absolute bg-secondary-white rounded-full"
						style={{
							width: "40vw",
							height: "40vw",
							position: "absolute",
							//   transform: "translate(10%, 50%)",
							zIndex: 1,
						}}
						></div>
					</div> */}
			</div>
			<div>
				<LandingPageTitle className="text-black" text="Connect & Communicate" />
				<RegularText className="py-8 md:py-16 text-black text-regular md:text-lg text-left">
					{
						"Add your partner and instantly unlock insights into each other's thoughts and feelings"
					}
				</RegularText>
				<Link
					href="/sign-up"
					className="font-bold hover:text-secondary transition-colors duration-200 ease-in-out text-xl md:text-2xl"
				>
					Start Growing Together {">"}
				</Link>
			</div>
		</SectionWrapper>
	);
};

export default Communicate;
