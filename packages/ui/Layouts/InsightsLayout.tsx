import Header from "../Header/Header";

interface InsightsLayoutProps {
	children: React.ReactNode | React.ReactElement;
}

const InsightsLayout = ({ children }: InsightsLayoutProps) => {
	return (
		<div className="flex flex-col h-full w-full">
			<Header />
			<div className="flex header-container text-center justify-center items-center">
			</div>
			<main className="p-4 flex-1 relative">{children}</main>
		</div>
	);
};

export default InsightsLayout;
