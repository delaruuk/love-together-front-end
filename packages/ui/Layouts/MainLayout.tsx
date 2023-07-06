import Header from "../Header/Header";

interface MainLayoutProps {
	children: React.ReactNode | React.ReactElement;
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className="flex flex-col h-full w-full">
			<Header />
			<main className="p-4 bg-white flex-1 relative">{children}</main>
		</div>
	);
};

export default MainLayout;
