import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import PartnerCategoryLinkCards from "ui/Links/PartnerCategoryLinkCards";

const Index: NextPageWithLayout = () => {
	return <PartnerCategoryLinkCards />;
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
