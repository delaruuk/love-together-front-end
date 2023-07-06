import {
	isAnswerPrimary,
	SurveyQuestion,
	SurveyQuestionAnswer,
	SurveyQuestionAnswerAlternate,
	SurveyQuestionAnswerPrimary,
	UserQuestion,
} from "models";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import AdminActionButton from "../Buttons/AdminActionButton";
import SmallGrayText from "../Text/SmallGrayText";

type AdminQuestionsSelectionsProps = {
	question: SurveyQuestion | UserQuestion;
	mode: "add" | "edit";
	name: string;
	formValues: { [key: string]: any };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
	currentAnswers: SurveyQuestionAnswer[];
};

const AdminQuestionSelections = ({
	question,
	mode,
	name,
	formValues,
	setFormValues,
	currentAnswers,
}: AdminQuestionsSelectionsProps) => {
	const [selections, setSelections] = useState<
		{ questionAnswer: SurveyQuestionAnswer; uuid: string }[]
	>(
		currentAnswers
			? currentAnswers.map((answer) => {
					return { questionAnswer: answer, uuid: uuidv4() };
			  })
			: []
	);

	const addSelection = () => {
		if (formValues.answerTypeId == 2) {
			setSelections([
				...selections,
				{
					questionAnswer: { answer: "", value: 0, ansId: selections.length },
					uuid: uuidv4(),
				},
			]);
		} else {
			if (formValues.answerTypeId == 3 && selections.length < 1) {
				setSelections([
					{
						questionAnswer: 1,
						uuid: uuidv4(),
					},
					{
						questionAnswer: "",
						uuid: uuidv4(),
					},
				]);
			} else {
				setSelections([
					...selections,
					{
						questionAnswer: "",
						uuid: uuidv4(),
					},
				]);
			}
		}
	};

	useEffect(() => {
		if (selections) {
			setFormValues({
				...formValues,
				[name]: selections.map((selection) => {
					return selection.questionAnswer;
				}),
			});
		}
	}, [selections]);

	useEffect(() => {
		if (formValues.answerTypeId && mode === "add") {
			setSelections([]);
			setFormValues({ ...formValues, [name]: [] });
		}
	}, [formValues.answerTypeId]);

	return (
		<div>
			{selections.length > 0 ? (
				<div className="flex flex-col gap-2">
					<label htmlFor="answers">
						<SmallGrayText>Answers</SmallGrayText>
					</label>
					{isAnswerPrimary(selections[0].questionAnswer) ? (
						<AnswerPrimary
							question={question}
							mode={mode}
							name={name}
							selections={
								selections as {
									questionAnswer: SurveyQuestionAnswerPrimary;
									uuid: string;
								}[]
							}
							setSelections={setSelections}
							currentAnswers={currentAnswers as SurveyQuestionAnswerPrimary[]}
						/>
					) : (
						<AnswerAlternate
							formValues={formValues}
							question={question}
							mode={mode}
							name={name}
							selections={
								selections as {
									questionAnswer: SurveyQuestionAnswerAlternate;
									uuid: string;
								}[]
							}
							setSelections={setSelections}
							currentAnswers={currentAnswers as SurveyQuestionAnswerAlternate[]}
						/>
					)}
				</div>
			) : null}
			<AdminActionButton
				className={`${selections.length > 0 ? "mt-4" : "mt-0"} w-full`}
				text="Add answer"
				type="button"
				color="blue"
				onClick={() => addSelection()}
			/>
		</div>
	);
};

export default AdminQuestionSelections;

interface AnswerPrimaryProps {
	question: SurveyQuestion | UserQuestion;
	mode: "add" | "edit";
	name: string;
	selections: {
		questionAnswer: SurveyQuestionAnswerPrimary;
		uuid: string;
	}[];
	setSelections: React.Dispatch<
		React.SetStateAction<
			{ questionAnswer: SurveyQuestionAnswer; uuid: string }[]
		>
	>;
	currentAnswers: SurveyQuestionAnswerPrimary[];
}

const AnswerPrimary = ({
	question,
	mode,
	name,
	selections,
	setSelections,
	currentAnswers,
}: AnswerPrimaryProps) => {
	const router = useRouter();

	const handleTextChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		ansId: number
	) => {
		const { value } = event.target;
		const newSelections = selections.map((selection) => {
			if (selection.questionAnswer.ansId === ansId) {
				return {
					...selection,
					questionAnswer: {
						answer: value,
						value: selection.questionAnswer.value,
						ansId: selection.questionAnswer.ansId,
					},
				};
			} else {
				return selection;
			}
		});
		setSelections(newSelections);
	};

	const handleValueChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		ansId: number
	) => {
		const { value } = event.target;
		const newSelections = selections.map((selection) => {
			if (selection.questionAnswer.ansId === ansId) {
				return {
					...selection,
					questionAnswer: {
						answer: selection.questionAnswer.answer,
						value: value,
						ansId: selection.questionAnswer.ansId,
					},
				};
			} else {
				return selection;
			}
		});
		setSelections(newSelections);
	};

	const removeSelection = (ansId: number) => {
		const newSelections = selections.filter(
			(selection) => selection.questionAnswer.ansId !== ansId
		);
		const reorderedAnsId = newSelections.map((selection, index) => {
			return {
				...selection,
				questionAnswer: {
					answer: selection.questionAnswer.answer,
					value: selection.questionAnswer.value,
					ansId: index,
				},
			};
		});
		setSelections(reorderedAnsId);
	};

	return (
		<div className="flex flex-col gap-2">
			<SmallGrayText className="text-xs">Value</SmallGrayText>
			{selections.map((selection, index) => (
				<div key={name + selection.uuid} className="flex">
					{router.asPath.includes("user-question") ? null : (
						<input
							className="mr-2 py-1 px-1 outline-none font-kumbh font-medium bg-transparent border-2 border-gray-500 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 autofill:text-gray-500 rounded-sm"
							type="number"
							autoComplete="off"
							min={0}
							max={10}
							defaultValue={selection.questionAnswer.value}
							name={name + selection.questionAnswer.ansId}
							onChange={(event) =>
								handleValueChange(event, selection.questionAnswer.ansId)
							}
						/>
					)}
					<div className="flex w-full relative">
						<input
							className="py-1 px-1 flex-1 outline-none font-kumbh font-medium bg-transparent border-b-2 border-gray-500 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 autofill:text-gray-500"
							type="text"
							autoComplete="off"
							name={name + selection.questionAnswer.ansId}
							defaultValue={selection.questionAnswer.answer}
							onChange={(event) =>
								handleTextChange(event, selection.questionAnswer.ansId)
							}
						/>
						{mode === "add" ||
						router.asPath.includes("user-questions") ||
						index + 1 > question.answers.length ? (
							<button
								type="button"
								className="absolute top-0 right-0 p-1 font-kumbh font-medium text-gray-500 hover:text-red-500 transition-colors ease-in-out duration-200"
								onClick={() => removeSelection(selection.questionAnswer.ansId)}
							>
								X
							</button>
						) : null}
					</div>
				</div>
			))}
		</div>
	);
};

interface AnswerAlternateProps {
	formValues: { [key: string]: any };
	question: SurveyQuestion | UserQuestion;
	mode: "add" | "edit";
	name: string;
	selections: { questionAnswer: SurveyQuestionAnswerAlternate; uuid: string }[];
	setSelections: React.Dispatch<
		React.SetStateAction<
			{ questionAnswer: SurveyQuestionAnswer; uuid: string }[]
		>
	>;
	currentAnswers: SurveyQuestionAnswerAlternate[];
}

const AnswerAlternate = ({
	formValues,
	question,
	mode,
	name,
	selections,
	setSelections,
	currentAnswers,
}: AnswerAlternateProps) => {
	const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const tempSelections = [...selections];
		const newSelections = tempSelections.map((selection, index) => {
			if (index === 0) {
				return { ...selection, questionAnswer: event.target.value };
			} else return selection;
		});
		setSelections(newSelections);
	};

	const handleTextChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		selectionIndex: string
	) => {
		const { value } = event.target;
		const newSelections = selections.map((selection, index) => {
			if (selection.uuid === selectionIndex) {
				return { ...selection, questionAnswer: value };
			} else {
				return { ...selection, questionAnswer: selection.questionAnswer };
			}
		});
		setSelections(newSelections);
	};

	const removeSelection = (selectionIndex: string) => {
		const newSelections = selections.filter(
			(selection, index) => selection.uuid !== selectionIndex
		);
		setSelections(newSelections);
	};

	useEffect(() => {
		console.log(selections);
	}, [selections]);

	if (formValues.answerTypeId == 3) {
		return (
			<div className="flex flex-col gap-2">
				<div className="flex items-center">
					<SmallGrayText className="pr-2">Selection Limit</SmallGrayText>
					<input
						key="NA"
						className="py-1 px-1 flex-grow outline-none font-kumbh font-medium bg-transparent border-2 border-gray-500 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 autofill:text-gray-500 rounded-sm"
						type="number"
						autoComplete="off"
						min={1}
						max={formValues.answers.length - 1}
						defaultValue={selections[0].questionAnswer}
						name={name + "selectionLimit"}
						onChange={(event) => handleLimitChange(event)}
					/>
				</div>
				{selections.slice(1).map((selection, index) => (
					<div key={name + selection.uuid} className="flex relative">
						<input
							className="py-1 px-1 flex-1 outline-none font-kumbh font-medium bg-transparent border-b-2 border-gray-500 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 autofill:text-gray-500"
							type="text"
							autoComplete="off"
							name={name + index}
							defaultValue={selection.questionAnswer}
							onChange={(event) => handleTextChange(event, selection.uuid)}
						/>
						{mode === "add" ||
						(question.answerTypeId != 3 &&
							index + 1 > question.answers.length) ||
						(question.answerTypeId == 3 &&
							index + 2 > question.answers.length) ? (
							<button
								type="button"
								className="absolute right-0 top-0 p-1 font-kumbh font-medium text-gray-500 hover:text-red-500 transition-colors ease-in-out duration-200"
								onClick={() => removeSelection(selection.uuid as string)}
							>
								X
							</button>
						) : null}
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{selections.map((selection, index) => (
				<div key={name + selection.uuid} className="flex relative">
					<input
						className="py-1 px-1 flex-1 outline-none font-kumbh font-medium bg-transparent border-b-2 border-gray-500 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 autofill:text-gray-500"
						type="text"
						autoComplete="off"
						name={name + index}
						defaultValue={selection.questionAnswer}
						onChange={(event) => handleTextChange(event, selection.uuid)}
					/>
					{mode === "add" || index + 1 > question.answers.length ? (
						<button
							type="button"
							className="absolute top-0 right-0 p-1 font-kumbh font-medium text-gray-500 hover:text-red-500 transition-colors ease-in-out duration-200"
							onClick={() => removeSelection(selection.uuid as string)}
						>
							X
						</button>
					) : null}
				</div>
			))}
		</div>
	);
};
