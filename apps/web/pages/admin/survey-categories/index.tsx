import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import CategoriesAdminCards from "ui/Admin/CategoriesAdminCards";

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
	return <CategoriesAdminCards />;
};
Index.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>;
};

export default Index;
