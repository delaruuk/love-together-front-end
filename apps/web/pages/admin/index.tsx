import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import AdminLayout from "ui/Layouts/AdminLayout";

const Index: NextPageWithLayout = () => {
	return (
		<>
			<>Admin</>
		</>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>;
};

export default Index;
