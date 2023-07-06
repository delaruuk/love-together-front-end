type Props = {
	className?: string;
	children: React.ReactNode;
};

const RegularTextMont = ({ className, children }: Props) => {
	return (
		<p
			className={`text-base font-mont font-medium ${
				className ? className : ""
			}`}
		>
			{children}
		</p>
	);
};

export default RegularTextMont;
