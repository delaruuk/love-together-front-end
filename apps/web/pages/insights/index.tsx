import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import CategoryLinkCards from "ui/Links/CategoryLinkCards";

const Index: NextPageWithLayout = () => {
	return (
		<CategoryLinkCards
			titleText="Insights"
			titleDescriptionText="Click any of the pillars below to view the associated Insights"
		/>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
