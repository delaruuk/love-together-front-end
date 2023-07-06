type TitleTextProps = {
	text: string;
	className?: string;
};

const TitleText = ({ text, className }: TitleTextProps) => {
	return (
		<h1
			className={`text-2xl text-main font-kumbh uppercase font-bold ${
				className ? className : ""
			}`}
		>
			{text}
		</h1>
	);
};

export default TitleText;