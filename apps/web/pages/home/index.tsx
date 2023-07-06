import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import Image from "next/image";
import MainLayout from "ui/Layouts/MainLayout";
import PillButtonLink from "ui/Links/PillButtonLink";
import TitleText from "ui/Text/TitleText";
import RegularTextMont from "ui/Text/RegularTextMont";

const logoImage = require("assets/logo.svg");

const Index: NextPageWithLayout = () => {
	return (
		<div className="h-full grid place-content-center">
			<div className="max-w-md  flex flex-col justify-center items-center first-of-type:[&>a]:mb-4">
				<Image src={logoImage} alt="compatibility" height={300} width={300} />

				<TitleText className="pt-4" text="Love Together" />
				<RegularTextMont className="py-4 text-center">
					This is the home page for Love Together, this page will act as your
					hub on the full release. It will grant you quick access to partners,
					compatibility, games, resources, and more! For now check out the
					available features below.
				</RegularTextMont>
				<PillButtonLink link="/profile" text="Profile" variant="main" />
				<PillButtonLink
					link="/compatibility"
					text="Compatibility"
					variant="main"
				/>
				<PillButtonLink
					link="/partners"
					text="Partners"
					variant="main"
					className="mt-4"
				/>
				<PillButtonLink
					link="/insights"
					text="Insights"
					variant="main"
					className="mt-4"
				/>
			</div>
		</div>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
