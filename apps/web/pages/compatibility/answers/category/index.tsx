import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import AnswersCards from "ui/DisplayCards/AnswersCards";

const Index: NextPageWithLayout = () => {
	return <AnswersCards />;
};
Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
