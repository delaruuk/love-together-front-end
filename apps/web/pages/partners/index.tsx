import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import PartnerCardLinks from "ui/Links/PartnerCardLinks";
import NotificationCards from "ui/DisplayCards/NotificationCards";
import TitleText from "ui/Text/TitleText";
import RegularTextMont from "ui/Text/RegularTextMont";

const Index: NextPageWithLayout = () => {
	return (
		<>
			<div className="pb-2 ">
				<TitleText text="Your partners" />
				<RegularTextMont className="!text-lg !font-semibold">
					You can add more than one partner for the compatibility test
				</RegularTextMont>
				<RegularTextMont className="!text-gray-500">
					Your partners will see all your answers and vice versa.
				</RegularTextMont>
			</div>
			<NotificationCards />
			<PartnerCardLinks />
		</>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
