import type { NextPageWithLayout } from "models";
import { useRouter } from "next/router";
import AuthLayout from "ui/Layouts/AuthLayout";
import RecoverEmailForm from "ui/Forms/RecoverEmailForm";
import RecoverPasswordForm from "ui/Forms/RecoverPasswordForm";
import ResetPasswordForm from "ui/Forms/ResetPasswordForm";

const Index: NextPageWithLayout = () => {
	const router = useRouter();
	const { mode } = router.query;

	if (mode === "recoverEmail") {
		return <RecoverEmailForm />;
	}
	if (mode === "resetPassword") {
		return <ResetPasswordForm />;
	}

	return (
		<div>
			<RecoverPasswordForm />
		</div>
	);
};

Index.getLayout = function getLayout(page: React.ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
