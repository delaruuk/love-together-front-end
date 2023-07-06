import { useAuthContext } from "context";
import {
	Category,
	isAnswerPrimary,
	SurveyQuestion,
	SurveyQuestionAnswer,
	SurveyQuestionAnswerAlternate,
	SurveyQuestionAnswerPrimary,
} from "models";
import React, { useEffect, useState } from "react";
import {
	deleteSurveyQuestion,
	editSurveyQuestion,
	getAdminCategories,
	postNewSurveyQuestion,
} from "utils";
import { useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";

import AdminActionButton from "../Buttons/AdminActionButton";
import SelectInput from "../InputFields/SelectInput";
import SmallGrayText from "../Text/SmallGrayText";
import AdminQuestionSelections from "../InputFields/AdminQuestionSelections";
import SingleStepTextInput from "../InputFields/SingleStepTextInput";
import ErrorText from "../Text/ErrorText";

interface AdminSurveyQuestionsModalContentProps {
	questions: SurveyQuestion[];
	showModal: {
		isActive: boolean;
		modalContent: SurveyQuestion | null;
		modalType: "add" | "delete" | "edit" | null;
	};
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: SurveyQuestion | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
}

const AdminSurveyQuestionsModalContent = ({
	questions,
	showModal,
	setShowModal,
}: AdminSurveyQuestionsModalContentProps) => {
	const queryClient = useQueryClient();
	const { user } = useAuthContext();
	const [formValues, setFormValues] = useState<{
		[key: string]: any;
	}>(
		showModal.modalContent
			? showModal.modalContent
			: {
					versionId: 1,
					categoryId: questions[0]?.categoryId,
					orderNum: questions?.length + 1,
					answerTypeId: 1,
					questionText: "",
					descriptionText: "",
					answerWeight: 1,
					answers: [],
					active: "true",
			  }
	);
	const [category, setCategory] = useState<string>("");
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	const [userRequestLoading, setUserRequestLoading] = useState<boolean>(false);
	const [userRequestError, setUserRequestError] = useState<string>("");
	const { data, isLoading, isError, error } = useQuery(
		["admin", "survey-categories"],
		() => getAdminCategories(user),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);

	const addQuestion = async () => {
		setUserRequestLoading(true);
		try {
			let tempFormValues = formValues;
			if (formValues.answerTypeId == 1) {
				tempFormValues.answers = [
					{ value: 0, answer: "0", ansId: 0 },
					{ value: 1, answer: "1", ansId: 1 },
					{ value: 2, answer: "2", ansId: 2 },
					{ value: 3, answer: "3", ansId: 3 },
					{ value: 4, answer: "4", ansId: 4 },
					{ value: 5, answer: "5", ansId: 5 },
					{ value: 6, answer: "6", ansId: 6 },
					{ value: 7, answer: "7", ansId: 7 },
					{ value: 8, answer: "8", ansId: 8 },
					{ value: 9, answer: "9", ansId: 9 },
					{ value: 10, answer: "10", ansId: 10 },
				];
			}
			await postNewSurveyQuestion(user, tempFormValues);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "survey-questions", category],
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
		setUserRequestLoading(true);
		try {
			await editSurveyQuestion(
				user,
				formValues,
				showModal.modalContent?._id as string
			);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "survey-questions", category],
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
		setUserRequestLoading(true);
		try {
			await deleteSurveyQuestion(user, showModal.modalContent?._id as string);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "survey-questions", category],
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

	const validate = () => {
		const errors: { [key: string]: string } = {};
		if (formValues.questionText === "") {
			errors.questionText = "Please input a valid question";
		}
		if (
			formValues.answerTypeId == 2 ||
			formValues.answerTypeId == 3 ||
			formValues.answerTypeId == 4
		) {
			if (formValues.answers.length === 0) {
				errors.answers = "Please input valid answers";
			} else {
				const isValidatedArray = formValues.answers.map(
					(answer: SurveyQuestionAnswer, index: number) => {
						if (isAnswerPrimary(answer)) {
							const tempAnswer = answer as SurveyQuestionAnswerPrimary;
							if (tempAnswer.answer === "") {
								return false;
							} else if (
								tempAnswer.value === "" ||
								tempAnswer.value > 10 ||
								tempAnswer.value < 0
							) {
								return false;
							} else {
								return true;
							}
						} else {
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
								} else return true;
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
					break;
				default:
					break;
			}
		}
	};

	useEffect(() => {
		console.log(formValues);
	}, [formErrors, formValues]);

	useEffect(() => {
		let numberCategory = formValues.categoryId as unknown;
		numberCategory = numberCategory as number;

		setCategory(
			data.filter(
				(category: Category) => category.categoryId === numberCategory
			)[0]?.category as string
		);
	}, [formValues.categoryId]);

	if (showModal.modalType === "add" || showModal.modalType === "edit") {
		return (
			<>
				<h1 className="text-blue-500 text-lg font-medium">
					{showModal.modalType === "add"
						? "Add survey question"
						: "Edit survey question"}
				</h1>
				<form onSubmit={(event) => handleSubmit(event)} noValidate>
					<div className="pb-2 flex flex-col gap-0.5">
						<div className="flex gap-2">
							<SmallGrayText>Version: 1</SmallGrayText>
						</div>
						{showModal.modalType === "add" ? (
							<div className="flex gap-2 items-center justify-between">
								<label htmlFor="categoryId">
									<SmallGrayText>Category:</SmallGrayText>
								</label>
								<SelectInput
									name="categoryId"
									selections={data.map((category: Category) => {
										return {
											value: category.categoryId,
											selection: category.category,
										};
									})}
									formValues={formValues}
									setFormValues={setFormValues}
									currentAnswers={formValues.categoryId}
								/>
							</div>
						) : null}
						{showModal.modalType === "add" ? (
							<div className="flex gap-2 items-center justify-between">
								<label htmlFor="answerTypeId">
									<SmallGrayText>Answer type:</SmallGrayText>
								</label>
								<SelectInput
									name="answerTypeId"
									selections={[
										{ value: 1, selection: "Scale 1-10" },
										{ value: 2, selection: "Select single" },
										{ value: 3, selection: "Select multiple" },
										{ value: 4, selection: "Rank selections" },
										{ value: 5, selection: "Text" },
									]}
									formValues={formValues}
									setFormValues={setFormValues}
									currentAnswers={formValues.answerTypeId}
								/>
							</div>
						) : null}
						<div className="flex gap-2 items-center justify-between">
							<label htmlFor="active">
								<SmallGrayText>Active</SmallGrayText>
							</label>
							<SelectInput
								name="active"
								selections={[
									{ value: true, selection: "Yes" },
									{ value: false, selection: "No" },
								]}
								formValues={formValues}
								setFormValues={setFormValues}
								currentAnswers={formValues.active}
							/>
						</div>
						<div className="flex gap-2 items-center justify-between">
							<label htmlFor="answerWeight">
								<SmallGrayText>Answer weight</SmallGrayText>
							</label>
							<SelectInput
								name="answerWeight"
								selections={[
									{ value: 1, selection: "1" },
									{ value: 2, selection: "2" },
								]}
								formValues={formValues}
								setFormValues={setFormValues}
								currentAnswers={formValues.answerWeight}
							/>
						</div>
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
							isError={formErrors.questionText ? true : false}
							formValues={formValues}
							setFormValues={setFormValues}
						/>
						{formErrors.questionText ? (
							<ErrorText className="pt-1" text={formErrors.questionText} />
						) : null}
					</div>
					<div className="pt-2">
						<label htmlFor="descriptionText">
							<SmallGrayText>Description text</SmallGrayText>
						</label>
						<SingleStepTextInput
							type="text"
							name="descriptionText"
							placeholder="Description"
							defaultValue={formValues.descriptionText}
							isError={formErrors.descriptionText ? true : false}
							formValues={formValues}
							setFormValues={setFormValues}
						/>
					</div>
					<div className="pt-4">
						{formValues.answerTypeId == 5 ||
						formValues.answerTypeId == 1 ? null : (
							<div className="pb-4">
								<AdminQuestionSelections
									question={showModal.modalContent as SurveyQuestion}
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
					{userRequestError ? (
						<ErrorText className="pt-1" text={userRequestError} />
					) : null}
				</form>
			</>
		);
	} else {
		return (
			<>
				<h1 className="text-red-500 text-lg font-medium">
					Delete survey question
				</h1>
				<form onSubmit={(event) => handleSubmit(event)} noValidate>
					<SmallGrayText>
						Are you sure you would like to delete this survey question? This
						action will delete this question from the survey, and it will no
						longer show up in users answers.
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
					<p className="pt-1 text-sm text-red-500">{userRequestError}</p>
				</form>
			</>
		);
	}
};

export default AdminSurveyQuestionsModalContent;
