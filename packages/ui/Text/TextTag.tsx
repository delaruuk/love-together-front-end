type TextTagProps = {
	text: string;
	color: "green" | "sky" | "indigo" | "yellow" | "red";
	className?: string;
};

const TextTag = ({ text, color, className }: TextTagProps) => {
	const chooseColor = () => {
		switch (color) {
			case "green":
				return "text-green-600 bg-green-200";
			case "sky":
				return "text-sky-600 bg-sky-200";
			case "indigo":
				return "text-indigo-600 bg-indigo-200";
			case "yellow":
				return "text-yellow-600 bg-yellow-200";
			case "red":
				return "text-red-600 bg-red-200";
			default:
				break;
		}
	};

	return (
		<span
			className={`py-1 px-2 h-min min-w-max text-xs tracking-wider font-kumbh font-bold inline-block uppercase rounded-full ${chooseColor()} uppercase${
				className ? ` ${className}` : ""
			}`}
		>
			{text}
		</span>
	);
};

export default TextTag;
