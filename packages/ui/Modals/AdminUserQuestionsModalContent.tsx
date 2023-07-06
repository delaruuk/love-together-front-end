import { useAuthContext } from "context";
import {
	isAnswerPrimary,
	UserQuestion,
	SurveyQuestionAnswer,
	SurveyQuestionAnswerPrimary,
	SurveyQuestionAnswerAlternate,
} from "models";
import { useQueryClient } from "react-query";

import { useEffect, useState } from "react";
import AdminActionButton from "../Buttons/AdminActionButton";
import AdminQuestionSelections from "../InputFields/AdminQuestionSelections";
import SelectInput from "../InputFields/SelectInput";
import SingleStepTextInput from "../InputFields/SingleStepTextInput";
import ErrorText from "../Text/ErrorText";
import { AxiosError } from "axios";

import SmallGrayText from "../Text/SmallGrayText";
import {
	deleteUserQuestion,
	editUserQuestion,
	postNewUserQuestion,
} from "utils";

type AdminUserQuestionsModalContentProps = {
	questions: UserQuestion[];
	showModal: {
		isActive: boolean;
		modalContent: UserQuestion | null;
		modalType: "add" | "delete" | "edit" | null;
	};
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: UserQuestion | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
};

const AdminUserQuestionsModalContent = ({
	questions,
	showModal,
	setShowModal,
}: AdminUserQuestionsModalContentProps) => {
	const queryClient = useQueryClient();
	const { user } = useAuthContext();
	const [formValues, setFormValues] = useState<{
		[key: string]: any;
	}>(
		showModal.modalContent
			? showModal.modalContent
			: {
					label: "",
					questionText: "",
					answerTypeId: 3,
					answers: [],
			  }
	);
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	const [userRequestLoading, setUserRequestLoading] = useState<boolean>(false);
	const [userRequestError, setUserRequestError] = useState<string | null>(null);

	const validate = () => {
		const errors: { [key: string]: string } = {};
		if (formValues.label === "") {
			errors.label = "Please input a valid label";
		}
		if (formValues.questionText === "") {
			errors.questionText = "Please input a valid question";
		}
		if (formValues.answerTypeId == 3) {
			if (formValues.answers.length === 0) {
				errors.answers = "Please input valid answers";
			} else {
				const isValidatedArray = formValues.answers.map(
					(answer: SurveyQuestionAnswerAlternate, index: number) => {
						const tempAnswer = answer as SurveyQuestionAnswerAlternate;
						if (formValues.answerTypeId == 3 && index === 0) {
							if (
								(tempAnswer as number) > formValues.answers.length - 1 ||
								(tempAnswer as number) < 1
							) {
								return false;
							} else return true;
						} else {
							if (tempAnswer === "") {
								return false;
							}
						}
					}
				);
				if (isValidatedArray.includes(false)) {
					errors.answers = "Please input valid answers";
				}
			}
		}
		return errors;
	};

	const addQuestion = async () => {
		try {
			await postNewUserQuestion(user, formValues);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "user-questions"],
				refetchInactive: true,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				setUserRequestError(
					error?.response?.data.errorMessage
						? error?.response?.data.errorMessage
						: error.message
				);
			}
		}
		setUserRequestLoading(false);
	};

	const editQuestion = async () => {
		try {
			await editUserQuestion(user, formValues);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "user-questions"],
				refetchInactive: true,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				setUserRequestError(
					error?.response?.data.errorMessage
						? error?.response?.data.errorMessage
						: error.message
				);
			}
		}
		setUserRequestLoading(false);
	};

	const deleteQuestion = async () => {
		try {
			await deleteUserQuestion(
				user,
				showModal.modalContent?.label as string,
				showModal.modalContent?.hidden as boolean
			);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "user-questions"],
				refetchInactive: true,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				setUserRequestError(
					error?.response?.data.errorMessage
						? error?.response?.data.errorMessage
						: error.message
				);
			}
		}
		setUserRequestLoading(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validate();
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			switch (showModal.modalType) {
				case "add":
					addQuestion();
					break;
				case "edit":
					editQuestion();
					break;
				case "delete":
					deleteQuestion();
				default:
					break;
			}
		}
	};
	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	if (showModal.modalType === "add" || showModal.modalType === "edit") {
		return (
			<>
				<h1 className="text-blue-500 text-lg font-medium">
					{showModal.modalType === "add"
						? "Add user question"
						: "Edit user question"}
				</h1>
				<form onSubmit={(event) => handleSubmit(event)} noValidate>
					{showModal.modalType === "add" ? (
						<div className="pb-1 flex gap-2 items-center justify-between">
							<label htmlFor="answerTypeId">
								<SmallGrayText>Answer type:</SmallGrayText>
							</label>
							<SelectInput
								name="answerTypeId"
								selections={[
									{ value: 3, selection: "Select multiple" },
									{ value: 5, selection: "Text" },
								]}
								formValues={formValues}
								setFormValues={setFormValues}
								currentAnswers={formValues.answerTypeId}
							/>
						</div>
					) : null}
					<div
						className={`pb-2 ${showModal.modalType === "add" ? "" : "flex"}`}
					>
						<label htmlFor="label">
							<SmallGrayText>Label text</SmallGrayText>
						</label>
						{showModal.modalType === "add" ? (
							<>
								<SingleStepTextInput
									type="text"
									name="label"
									placeholder="Label"
									defaultValue={formValues.label}
									formValues={formValues}
									setFormValues={setFormValues}
								/>
								{formErrors.label ? (
									<ErrorText className="pt-1" text={formErrors.label} />
								) : null}
							</>
						) : (
							<SmallGrayText className="flex-grow text-end">
								{formValues.label}
							</SmallGrayText>
						)}
					</div>
					<div>
						<label htmlFor="questionText">
							<SmallGrayText>Question text</SmallGrayText>
						</label>
						<SingleStepTextInput
							type="text"
							name="questionText"
							placeholder="Question"
							defaultValue={formValues.questionText}
							formValues={formValues}
							setFormValues={setFormValues}
						/>
						{formErrors.questionText ? (
							<ErrorText className="pt-1" text={formErrors.questionText} />
						) : null}
					</div>
					<div className="pt-4">
						{formValues.answerTypeId === "5" ||
						formValues.answerTypeId === 5 ||
						formValues.answerTypeId === "1" ||
						formValues.answerTypeId === 1 ? null : (
							<div className="pb-4">
								<AdminQuestionSelections
									question={showModal.modalContent as UserQuestion}
									mode={showModal.modalType === "add" ? "add" : "edit"}
									name="answers"
									formValues={formValues}
									setFormValues={setFormValues}
									currentAnswers={formValues.answers}
								/>
								{formErrors.answers ? (
									<ErrorText className="pt-1" text={formErrors.answers} />
								) : null}
							</div>
						)}
						<div className="flex flex-col sm:flex-row gap-4 ">
							<AdminActionButton
								className="sm:w-1/2"
								text="Cancel"
								type="button"
								color="red"
								onClick={() => setShowModal({ ...showModal, isActive: false })}
							/>
							<AdminActionButton
								className="sm:w-1/2"
								text="Confirm"
								type="submit"
								color="green"
							/>
						</div>
					</div>
				</form>
			</>
		);
	}
	return (
		<>
			<h1 className="text-red-500 text-lg font-medium">Delete user question</h1>
			<form onSubmit={(event) => handleSubmit(event)} noValidate>
				<SmallGrayText>
					Are you sure you would like to delete this user question? This action
					will delete this question permanently and cannot be undone.
				</SmallGrayText>
				<div className="pt-2 flex flex-col sm:flex-row gap-4 ">
					<AdminActionButton
						className="sm:w-1/2 "
						text="Cancel"
						type="button"
						color="red"
						onClick={() => setShowModal({ ...showModal, isActive: false })}
					/>
					<AdminActionButton
						className="sm:w-1/2 "
						text="Confirm"
						type="submit"
						color="green"
					/>
				</div>
			</form>
		</>
	);
};

export default AdminUserQuestionsModalContent;
