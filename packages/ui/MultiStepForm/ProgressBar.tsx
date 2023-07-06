interface ProgressBarProps {
	page: number;
	questionsLength: number;
}

const ProgressBar = ({ page, questionsLength }: ProgressBarProps) => {
	return (
		<p className="text-sm font-kumbh font-bold">
			{page + 1} / {questionsLength}
		</p>
	);
};

export default ProgressBar;
