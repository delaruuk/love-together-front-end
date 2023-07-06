import { useEffect, useState } from "react";
import { SurveyQuestion, UserQuestion } from "models";
import RadioInput from "../InputFields/RadioInput";
import CheckBoxInput from "../InputFields/CheckBoxInput";
import RankInput from "../InputFields/RankInput";
import { validateShareCode } from "utils";
import { useAuthContext } from "context";
import DateInput from "../InputFields/DateInput";
import { AxiosError } from "axios";
import SmallGrayText from "../Text/SmallGrayText";
import ErrorText from "../Text/ErrorText";
import MultiStepTextInput from "../InputFields/MultiStepTextInput";

interface MultiStepFormQuestionProps {
	question: SurveyQuestion | UserQuestion;
	formValues: { [key: string]: any[] };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
	setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
	codeValidated: boolean;
	setCodeValidated: React.Dispatch<React.SetStateAction<boolean>>;
	getCurrentKey: (
		key: string,
		object: {
			[key: string]: any[];
		}
	) => string | number;
}

const MultiStepFormQuestion = ({
	question,
	formValues,
	setFormValues,
	setIsValidated,
	codeValidated,
	setCodeValidated,
	getCurrentKey,
}: MultiStepFormQuestionProps) => {
	const { user } = useAuthContext();
	const currentAnswers: string[] | number[] =
		formValues[getCurrentKey(question?._id, formValues)];
	const [codeInputError, setCodeInputError] = useState<string | null>(null);
	const [codeError, setCodeError] = useState<string | null>(null);

	const validateCode = async () => {
		try {
			const isValidated = await validateShareCode(
				user,
				formValues.shareCode[0]
			);
			setCodeValidated(isValidated.status);
		} catch (error: unknown) {
			setCodeValidated(false);
			if (error instanceof AxiosError) {
				setCodeError(error.response?.data.message);
			}
		}
	};

	// check if current answer is valid
	useEffect(() => {
		if (question.answerTypeId === 99) {
			// validating string contents with regex tests for sharecode
			const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
			const numbers = /[0-9]/;
			const capitals = /[A-Z]/;
			if (
				currentAnswers &&
				currentAnswers.length > 0 &&
				!(currentAnswers[0] as string).includes(" ") &&
				specialChars.test(currentAnswers[0] as string) &&
				numbers.test(currentAnswers[0] as string) &&
				capitals.test(currentAnswers[0] as string) &&
				codeValidated
			) {
				setIsValidated(true);
			} else {
				let errorMessage = "";
				if (currentAnswers && currentAnswers.length > 0) {
					if (!specialChars.test(currentAnswers[0] as string)) {
						errorMessage += "a special character; ";
					}
					if (!numbers.test(currentAnswers[0] as string)) {
						errorMessage += "a number; ";
					}
					if (!capitals.test(currentAnswers[0] as string)) {
						errorMessage += "a capital letter ";
					}
				}
				if (errorMessage !== "") {
					setCodeInputError("Your code is missing: " + errorMessage);
				}
				if (
					(currentAnswers && currentAnswers[0] === "") ||
					errorMessage === ""
				) {
					setCodeInputError(null);
				}
				setIsValidated(false);
			}
		} else {
			if (
				currentAnswers &&
				currentAnswers.length > 0 &&
				currentAnswers[0] !== ""
			) {
				setIsValidated(true);
			} else {
				setIsValidated(false);
			}
		}
	}, [formValues, codeValidated]);

	useEffect(() => {
		console.log(formValues);
		// invalidate code every time user types
		if (question.answerTypeId === 99) {
			setCodeValidated(false);
			setCodeError(null);
		}
	}, [formValues]);

	const chooseInput = () => {
		switch (question?.answerTypeId) {
			case 1:
				return (
					<div>
						<RadioInput
							question={question}
							variant={"horizontal"}
							formValues={formValues}
							setFormValues={setFormValues}
							currentAnswers={currentAnswers as number[]}
						/>
						<SmallGrayText className="pt-1">
							0 - strongly disagree, 10 - strongly agree
						</SmallGrayText>
					</div>
				);
			case 2:
				return (
					<RadioInput
						question={question}
						variant={"vertical"}
						formValues={formValues}
						setFormValues={setFormValues}
						currentAnswers={currentAnswers as number[]}
					/>
				);
			case 3:
				return (
					<CheckBoxInput
						selectionLimit={question?.answers[0] as number}
						question={question}
						formValues={formValues}
						setFormValues={setFormValues}
						currentAnswers={currentAnswers as string[]}
					/>
				);
			case 4:
				return (
					<RankInput
						question={question}
						formValues={formValues}
						setFormValues={setFormValues}
						currentAnswers={currentAnswers as string[]}
					/>
				);
			case 5:
				return (
					<MultiStepTextInput
						type="text"
						name={question._id}
						placeholder="Answer here..."
						formValues={formValues}
						setFormValues={setFormValues}
						currentAnswers={currentAnswers as string[]}
					/>
				);
			// birth input
			case 98:
				return (
					<DateInput
						name={question._id}
						formValues={formValues}
						setFormValues={setFormValues}
						currentAnswers={currentAnswers as string[]}
					/>
				);
			// sharecode input
			case 99:
				return (
					<>
						<SmallGrayText className="pb-1">
							Want to discover your love roadmap to assess a new relationship or
							nurture an old one?{" "}
							<span className="uppercase font-bold">create</span> and{" "}
							<span className="uppercase font-bold">give</span> them your share
							code. You can find it in the profile page. Your partner will see
							all your answers with this code.
						</SmallGrayText>
						<MultiStepTextInput
							type="text"
							name={question._id}
							placeholder="Answer here..."
							formValues={formValues}
							setFormValues={setFormValues}
							currentAnswers={currentAnswers as string[]}
						/>
						{codeInputError ? (
							<ErrorText className="mt-1" text={codeInputError} />
						) : null}
						<SmallGrayText className="pt-1">
							At least 1 uppercase, at least 1 number, at least 1 special
							character, no spaces
						</SmallGrayText>
						{codeError ? (
							<button
								className="mt-1 text-white font-kumbh bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 cursor-pointer disabled:cursor-default"
								onClick={() => validateCode()}
							>
								{codeError}
							</button>
						) : (
							<button
								disabled={codeValidated ? true : false}
								className={`mt-1 text-white font-kumbh ${
									codeValidated
										? "bg-green-600"
										: "bg-blue-600 hover:bg-blue-800"
								} font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 cursor-pointer disabled:cursor-default`}
								onClick={() => validateCode()}
							>
								{codeValidated ? "Code Available" : "Validate Code"}
							</button>
						)}
					</>
				);
			default:
				return null;
		}
	};
	return (
		<div className="max-w-xl">
			<div className="pb-1">
				<legend className="text-lg font-mont font-medium">
					{question.questionText}
				</legend>
				{question?.descriptionText && question?.descriptionText !== "" ? (
					<SmallGrayText>{question.descriptionText}</SmallGrayText>
				) : null}
			</div>
			{chooseInput()}
		</div>
	);
};

export default MultiStepFormQuestion;
