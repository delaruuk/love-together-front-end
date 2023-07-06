type PillButtonProps = {
	className?: string;
	text: string;
	type: "button" | "submit";
	variant: "main" | "clear-white" | "clear-black" | "white" | "secondary";
	onClick?: () => void;
};

const PillButton = ({
	className,
	text,
	type,
	variant,
	onClick,
}: PillButtonProps) => {
	const chooseCss = () => {
		switch (variant) {
			case "clear-black":
				return "border-black hover:border-main text-black hover:text-main";
			case "clear-white":
				return "border-white hover:border-main text-white hover:text-main";
			case "main":
				return "border-main hover:border-main-dark bg-main hover:bg-main-dark text-white";
			case "white":
				return "text-main border-white bg-white hover:bg-gray-200 hover:border-gray-200";
			case "secondary":
				return "text-white border-secondary bg-secondary hover:bg-secondary-dark hover:border-secondary-dark";
			default:
				break;
		}
	};

	return (
		<button
			type={type}
			className={`py-2 px-4 max-w-xs w-full text-lg font-kumbh font-semibold border-2 ${chooseCss()} text-center rounded-full transition-colors ease-in-out duration-200 ${
				className ? className : ""
			}`}
			onClick={onClick ? () => onClick() : () => {}}
		>
			{text}
		</button>
	);
};

export default PillButton;
