import type { NextPageWithLayout } from "models";
import AuthLayout from "ui/Layouts/AuthLayout";
import AuthForm from "ui/Forms/AuthForm";

const Index: NextPageWithLayout = () => {
	return (
		<AuthForm
			authMethod="sign-up"
			titleText="Create account"
			buttonText="Confirm"
			optionsText="or sign up with"
		/>
	);
};

Index.getLayout = function getLayout(page: React.ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
