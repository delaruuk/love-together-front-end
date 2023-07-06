type TitleTextUnderlineProps = {
	className?: string;
	text: string;
};

const TitleTextUnderline = ({ className, text }: TitleTextUnderlineProps) => {
	return (
		<h1
			className={`text-3xl font-extrabold font-kumbh tracking-wider uppercase after:block after:mt-1  after:w-16 after:h-0.5 after:bg-secondary ${
				className ? className : ""
			}`}
		>
			{text}
		</h1>
	);
};

export default TitleTextUnderline;
