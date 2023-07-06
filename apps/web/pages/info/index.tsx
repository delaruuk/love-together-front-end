import type { NextPageWithLayout } from "models";
import LandingLayout from "ui/Layouts/LandingLayout";

import Image from "next/image";
import PillButtonLink from "ui/Links/PillButtonLink";
import SmallGrayText from "ui/Text/SmallGrayText";
import TitleText from "ui/Text/TitleText";
import Link from "next/link";

import PillButton from "ui/Buttons/PillButton";

const clockImage = require("assets/clock.svg");
const trainingImage = require("assets/training.svg");
const cogImage = require("assets/cog.svg");

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
	return (
		<div className="p-4 h-full w-full grid place-content-center">
			<div className="pb-[5rem] flex flex-col items-center">
				<Image
					priority
					src={clockImage}
					alt="Love Together - Home"
					width={100}
					height={100}
				/>
				<h1 className="text-center text-3xl font-bold uppercase">
					Coming Soon
				</h1>
			</div>
			<div className="pb-8 flex flex-col items-center">
				<h3 className="text-center text-xl font-bold uppercase">
					1. Coach in your pocket in progress
				</h3>
				<Image
					priority
					src={trainingImage}
					alt="Love Together - Home"
					width={80}
					height={80}
				/>
			</div>
			<div className="pb-[5rem] flex flex-col items-center">
				<h3 className="text-center text-xl font-bold uppercase">
					2. Resource Center in progress
				</h3>
				<Image
					priority
					src={cogImage}
					alt="Love Together - Home"
					width={80}
					height={80}
				/>
			</div>
			<div className="flex flex-col items-center">
				<PillButtonLink variant="main" text="Sign Up" link="/sign-up" />
				<h2 className="pt-4 text-2xl font-bold uppercase">Stay tuned</h2>
			</div>
		</div>
	);
};

Index.getLayout = function getLayout(page: React.ReactElement) {
	return <LandingLayout>{page}</LandingLayout>;
};

export default Index;
