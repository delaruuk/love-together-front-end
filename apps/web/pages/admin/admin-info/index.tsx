import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import AdminInfoCards from "ui/Admin/AdminInfoCards";

const Index: NextPageWithLayout = () => {
	return <AdminInfoCards />;
};
Index.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>;
};

export default Index;
