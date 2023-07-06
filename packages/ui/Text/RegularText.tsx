type Props = {
	className?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
	
};

const RegularText = ({ className = '', children, style = {} }: Props) => {
	return (
		<h2
			className={`text-white font-sm ${className}`}
			style={style}
		>
			{children}
		</h2>
	);
};
export default RegularText;
