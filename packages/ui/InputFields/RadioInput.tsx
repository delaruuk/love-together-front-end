import { useEffect } from "react";
import { setDefaultCheckedSingle } from "utils";
import {
	SurveyQuestionAnswerPrimary,
	SurveyQuestion,
	UserQuestion,
} from "models";

interface RadioProps {
	index: number;
	question: SurveyQuestion | UserQuestion;
	answer: SurveyQuestionAnswerPrimary;
	variant: "horizontal" | "vertical";
	formValues: { [key: string]: any[] };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
	currentAnswers: number[];
}

const Radio = ({
	index,
	question,
	answer,
	variant,
	formValues,
	setFormValues,
	currentAnswers,
}: RadioProps) => {
	const chooseWrapperCss = () => {
		switch (variant) {
			case "horizontal":
				return "inline-flex";
			case "vertical":
				return "mb-2 last:mb-0 flex";
			default:
				break;
		}
	};

	const chooseInputCss = () => {
		switch (variant) {
			case "horizontal":
				return "p-3.5 max-w-4 w-full";
			case "vertical":
				return "p-2 w-full text-start";
			default:
				break;
		}
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		selection: SurveyQuestionAnswerPrimary
	) => {
		const { checked } = event.target;
		if (checked) {
			setFormValues({ ...formValues, [question._id]: [selection.ansId] });
		} else {
			setFormValues({
				...formValues,
				[question._id]: currentAnswers.filter(
					(answer: number) => answer !== selection.ansId
				),
			});
		}
	};

	return (
		<div key={index} className={chooseWrapperCss()}>
			<input
				className={`peer sr-only`}
				id={question._id + index}
				type="radio"
				value={answer.value}
				checked={setDefaultCheckedSingle(answer, currentAnswers)}
				name={question._id}
				onChange={(event) => handleChange(event, answer)}
			/>
			<label
				className={`${chooseInputCss()} font-kumbh font-semibold cursor-pointer bg-gray-200 peer-checked:bg-gray-400 hover:bg-gray-300 border-2 border-black transition-colors ease-in-out duration-300 rounded-md text-center`}
				htmlFor={question._id + index}
			>
				{answer.answer}
			</label>
		</div>
	);
};

type RadioInputProps = {
	question: SurveyQuestion | UserQuestion;
	variant: "horizontal" | "vertical";
	formValues: { [key: string]: any[] };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
	currentAnswers: number[];
};

const RadioInput = ({
	question,
	variant,
	formValues,
	setFormValues,
	currentAnswers,
}: RadioInputProps) => {
	const chooseParentCss = () => {
		switch (variant) {
			case "horizontal":
				return "grid grid-cols-6 max-w-max sm:flex  gap-2";
			case "vertical":
				return "max-w-max";
			default:
				break;
		}
	};
	return (
		<div className={chooseParentCss()}>
			{question.answers?.map((answer, index: number) => (
				<Radio
					key={index}
					index={index}
					question={question}
					answer={answer as SurveyQuestionAnswerPrimary}
					variant={variant}
					formValues={formValues}
					setFormValues={setFormValues}
					currentAnswers={currentAnswers}
				/>
			))}
		</div>
	);
};

export default RadioInput;
