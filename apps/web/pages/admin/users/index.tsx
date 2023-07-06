import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import UserAdminCards from "ui/Admin/UserAdminCards";

const Index: NextPageWithLayout = () => {
	return <UserAdminCards />;
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>;
};

export default Index;
