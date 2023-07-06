import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import Image from "next/image";
import MainLayout from "ui/Layouts/MainLayout";
import PillButtonLink from "ui/Links/PillButtonLink";
import TextLink from "ui/Links/TextLink";
import TitleText from "ui/Text/TitleText";
import RegularTextMont from "ui/Text/RegularTextMont";

const puzzleImage = require("assets/puzzle.svg");

const Index: NextPageWithLayout = () => {
	return (
		<div className="h-full grid place-content-center">
			<div className="max-w-xs flex flex-col justify-center items-center first-of-type:[&>a]:mb-4 last-of-type:[&>a]:mt-2">
				<Image src={puzzleImage} alt="compatibility" height={150} width={150} />
				<TitleText
					className="pt-4 text-center"
					text="Compatibility Assessment"
				/>
				<RegularTextMont className="py-4 text-center">
					This assessment helps us understand you and your current relationship
					better. There are no right or wrong answers, so relax, have fun!
				</RegularTextMont>
				<PillButtonLink
					link="/compatibility/questions"
					text="Answer questions"
					variant="main"
				/>
				<PillButtonLink
					link="/compatibility/answers"
					text="View answers"
					variant="main"
				/>
				<TextLink link="/home">I will do it later</TextLink>
			</div>
		</div>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
