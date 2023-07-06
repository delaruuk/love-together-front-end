import { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import UserQuestionsAdminCards from "ui/Admin/UserQuestionsAdminCards";

const Index: NextPageWithLayout = () => {
	return <UserQuestionsAdminCards />;
};
Index.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>;
};

export default Index;
