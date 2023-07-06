type ErrorTextProps = {
	className?: string;
	text: string;
};

const ErrorText = ({ className, text }: ErrorTextProps) => {
	return (
		<p
			className={`text-xs text-red-500 font-kumbh font-semibold ${
				className ? className : ""
			}`}
		>
			{text}
		</p>
	);
};

export default ErrorText;
