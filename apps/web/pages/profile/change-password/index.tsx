import type { NextPageWithLayout } from "models";
import { ReactElement, useState } from "react";
import MainLayout from "ui/Layouts/MainLayout";
import RevalidateForm from "ui/Forms/RevalidateForm";
import ChangePasswordForm from "ui/Forms/ChangePasswordForm";

const Index: NextPageWithLayout = () => {
	const [isValidated, setIsValidated] = useState<boolean>(false);
	if (!isValidated) {
		return <RevalidateForm setIsValidated={setIsValidated} />;
	}
	return <ChangePasswordForm />;
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
