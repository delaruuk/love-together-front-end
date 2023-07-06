type AdminActionButtonProps = {
	className?: string;
	disabled?: boolean;
	text: string;
	type: "button" | "submit";
	color: "green" | "blue" | "yellow" | "red";
	onClick?: () => void;
};

const AdminActionButton = ({
	className,
	disabled,
	text,
	type,
	color,
	onClick,
}: AdminActionButtonProps) => {
	const chooseCss = () => {
		switch (color) {
			case "green":
				return "bg-green-500 hover:bg-green-600";
			case "red":
				return "bg-red-500 hover:bg-red-600";
			case "blue":
				return "bg-blue-500 hover:bg-blue-600";
			case "yellow":
				return "bg-yellow-500 hover:bg-yellow-600";
			default:
				break;
		}
	};

	return (
		<button
			disabled={disabled}
			type={type}
			className={`p-2  text-sm font-kumbh font-semibold text-white rounded-md ${chooseCss()} disabled:bg-gray-400 transition-colors ease-in-out duration-200 ${className}`}
			onClick={onClick ? () => onClick() : () => {}}
		>
			{text}
		</button>
	);
};

export default AdminActionButton;
