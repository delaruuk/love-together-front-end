import type { NextPageWithLayout } from "models";
import { ReactElement, useState } from "react";
import MainLayout from "ui/Layouts/MainLayout";
import RevalidateForm from "ui/Forms/RevalidateForm";
import ChangeEmailForm from "ui/Forms/ChangeEmailForm";

const Index: NextPageWithLayout = () => {
	const [isValidated, setIsValidated] = useState<boolean>(false);
	if (!isValidated) {
		return <RevalidateForm setIsValidated={setIsValidated} />;
	}
	return <ChangeEmailForm />;
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
