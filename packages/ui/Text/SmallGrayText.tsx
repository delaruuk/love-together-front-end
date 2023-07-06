type SmallGrayTextProps = {
	children: React.ReactNode;

	className?: string;
};

const SmallGrayText = ({ children, className }: SmallGrayTextProps) => {
	return (
		<p
			className={`text-sm text-gray-500 font-mont font-light ${
				className ? className : null
			} `}
		>
			{children}
		</p>
	);
};

export default SmallGrayText;
