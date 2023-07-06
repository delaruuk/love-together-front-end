type SectionWrapperProps = {
	sectionClassName: string; //mostly for background color
	divClassName?: string;
	children: React.ReactNode | React.ReactElement;
};

const SectionWrapper = ({
	sectionClassName,
	divClassName,
	children,
}: SectionWrapperProps) => {
	return (
		<section className={`py-10 md:py-20 ${sectionClassName}`}>
			<div
				className={`mx-auto px-4 max-w-7xl flex gap-8 flex-col md:flex-row items-center justify-between ${divClassName}`}
			>
				{children}
			</div>
		</section>
	);
};

export default SectionWrapper;
