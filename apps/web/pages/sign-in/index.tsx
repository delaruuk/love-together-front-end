import type { NextPageWithLayout } from "models";
import AuthLayout from "ui/Layouts/AuthLayout";
import AuthForm from "ui/Forms/AuthForm";

const Index: NextPageWithLayout = () => {
	return (
		<AuthForm
			authMethod="sign-in"
			titleText="Sign in"
			buttonText="Login"
			optionsText="or sign in with"
		/>
	);
};

Index.getLayout = function getLayout(page: React.ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
