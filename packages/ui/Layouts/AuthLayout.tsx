type AuthLayoutProps = {
	children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<main className="p-4 h-full w-full grid place-content-center">
			{children}
		</main>
	);
};

export default AuthLayout;
