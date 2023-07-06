import { useEffect, useRef } from "react";
import {
	SurveyQuestionAnswerAlternate,
	SurveyQuestion,
	UserQuestion,
} from "models";
import { setDefaultCheckedMulti } from "utils";

interface CheckBoxProps {
	index: number;
	selectionLimit: number;
	question: SurveyQuestion | UserQuestion;
	answer: SurveyQuestionAnswerAlternate;
	formValues: { [key: string]: any[] };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
	currentAnswers: string[];
}

const CheckBox = ({
	index,
	selectionLimit,
	question,
	answer,
	formValues,
	setFormValues,
	currentAnswers,
}: CheckBoxProps) => {
	const checkbox = useRef<HTMLInputElement | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		if (checked) {
			if (!currentAnswers) {
				setFormValues({ ...formValues, [question._id]: [answer] });
			}
			if (currentAnswers && currentAnswers.length <= selectionLimit - 1) {
				setFormValues({
					...formValues,
					[question._id]: [...currentAnswers, answer],
				});
			}
			if (currentAnswers && currentAnswers.length > selectionLimit - 1) {
				setFormValues({
					...formValues,
					[question._id]: [
						...currentAnswers.filter((answer, index) => index !== 0),
						answer,
					],
				});
			}
		} else {
			setFormValues({
				...formValues,
				[question._id]: currentAnswers.filter(
					(selection) => selection !== answer
				),
			});
		}
	};

	useEffect(() => {
		if (currentAnswers && checkbox.current) {
			const isChecked = currentAnswers.includes(answer as string);
			checkbox.current.checked = isChecked;
		}
	}, [currentAnswers]);

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	return (
		<>
			{index === 0 ? null : (
				<div className="mb-2 last:mb-0 flex">
					<input
						className="hidden peer"
						ref={checkbox}
						id={question._id + index}
						type="checkbox"
						value={answer}
						defaultChecked={setDefaultCheckedMulti(
							answer as SurveyQuestionAnswerAlternate,
							currentAnswers
						)}
						name={question._id}
						onChange={(event) => handleChange(event)}
					/>
					<label
						className={
							"w-full p-2 cursor-pointer font-kumbh font-semibold bg-gray-200 hover:bg-gray-300 peer-checked:bg-gray-400 border-2 border-black transition-colors ease-in-out duration-200 rounded-md"
						}
						htmlFor={question._id + index}
					>
						{answer}
					</label>
				</div>
			)}
		</>
	);
};

interface CheckBoxInputProps {
	selectionLimit: number;
	question: SurveyQuestion | UserQuestion;
	formValues: { [key: string]: any[] };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
	currentAnswers: string[];
}

const CheckBoxInput = ({
	selectionLimit,
	question,
	formValues,
	setFormValues,
	currentAnswers,
}: CheckBoxInputProps) => {
	return (
		<div className="max-w-max">
			{question.answers?.map((answer, index) => (
				<CheckBox
					key={index}
					index={index}
					selectionLimit={selectionLimit}
					question={question}
					answer={answer as SurveyQuestionAnswerAlternate}
					formValues={formValues}
					setFormValues={setFormValues}
					currentAnswers={currentAnswers}
				/>
			))}
		</div>
	);
};

export default CheckBoxInput;
