import { useRef } from "react";
import Header from "../Header/Header";
import HeroContent from "../Landing/Hero";

interface LandingLayoutProps {
	children: React.ReactNode | React.ReactElement;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const headerHeight = headerRef.current?.clientHeight;

	return (
		<>
			<Header headerRef={headerRef} />
			<main>
				{/* hero section */}
				<section style={{ height: `calc(100vh - ${headerHeight}px)` }}>
					<HeroContent />
				</section>
				{/* rest of sections */}
				{children}
			</main>
		</>
	);
};

export default LandingLayout;
