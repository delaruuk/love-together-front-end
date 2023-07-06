import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import InsightsLinkCards from "ui/Links/InsightsLinkCards";

const Index: NextPageWithLayout = () => {
	return <InsightsLinkCards />;
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
