import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import CategoryLinkCards from "ui/Links/CategoryLinkCards";

const Index: NextPageWithLayout = () => {
	return (
		<CategoryLinkCards
			titleText="Answers"
			titleDescriptionText="Click on a pillar to view your answers"
		/>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
