import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import InsightInfoCards from "ui/DisplayCards/InsightInfoCards";

const Index: NextPageWithLayout = () => {
	return <InsightInfoCards />;
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
