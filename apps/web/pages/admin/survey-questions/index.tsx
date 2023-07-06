import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import SurveyQuestionsAdminCards from "ui/Admin/SurveyQuestionsAdminCards";

const Index: NextPageWithLayout = () => {
	return <SurveyQuestionsAdminCards />;
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>;
};

export default Index;
