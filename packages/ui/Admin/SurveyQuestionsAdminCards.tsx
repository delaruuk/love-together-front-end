import {
	MongoUser,
	SurveyQuestion,
	SurveyQuestionAnswerAlternate,
	SurveyQuestionAnswerPrimary,
} from "models";
import { ReactElement, useDebugValue, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "context";
import { useQuery, useQueryClient } from "react-query";
import {
	getAdminCategories,
	getUsers,
	getAdminCategoryQuestions,
	reorderSurveyQuestions,
} from "utils";
import PageLoading from "ui/Loading/PageLoading";
import AdminActionButton from "../Buttons/AdminActionButton";
import SmallGrayText from "../Text/SmallGrayText";
import AdminCategoryButtons from "../Buttons/AdminCategoryButtons";
import TextTag from "../Text/TextTag";
import ModalWrapper from "../Modals/ModalWrapper";
import AdminSurveyQuestionsModalContent from "../Modals/AdminSurveyQuestionsModalContent";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "react-beautiful-dnd";
import RegularTextMont from "../Text/RegularTextMont";

type SurveyQuestionsAdminCardProps = {
	questionsIndex: number;
	question: SurveyQuestion;
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: SurveyQuestion | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
};

const SurveyQuestionsAdminCard = ({
	questionsIndex,
	question,
	setShowModal,
}: SurveyQuestionsAdminCardProps) => {
	const displayAnswers = () => {
		if (question.answerTypeId === 1) {
			return <RegularTextMont className="!font-regular">1-10</RegularTextMont>;
		}

		if (question.answerTypeId === 2) {
			const answers = question.answers as SurveyQuestionAnswerPrimary[];
			return (
				<div>
					{answers.map((answer, index) => (
						<RegularTextMont
							className="!font-regular"
							key={question._id + index}
						>
							{answer.answer}
						</RegularTextMont>
					))}
				</div>
			);
		}

		if (question.answerTypeId === 3) {
			const answers = question.answers as SurveyQuestionAnswerAlternate[];
			return (
				<div>
					<SmallGrayText>Selection limit: {answers[0]}</SmallGrayText>
					{answers.map((answer, index) => {
						if (index >= 1) {
							return (
								<RegularTextMont
									className="!font-regular"
									key={question._id + index}
								>
									{answer}
								</RegularTextMont>
							);
						}
					})}
				</div>
			);
		}

		if (question.answerTypeId === 5) {
			return (
				<RegularTextMont className="!font-regular">Text input</RegularTextMont>
			);
		}

		const answers = question.answers as SurveyQuestionAnswerAlternate[];
		return (
			<div>
				{answers.map((answer, index) => (
					<RegularTextMont className="!font-regular" key={question._id + index}>
						{answer}
					</RegularTextMont>
				))}
			</div>
		);
	};

	return (
		<div className="py-2 flex flex-col items-start border-b-2 border-gray-400 bg-[#fffdf3] bg-opacity-70">
			<div className="flex flex-col sm:flex-row sm:items-center">
				<SmallGrayText>{question._id}</SmallGrayText>
				<div className="sm:pl-2 flex gap-2">
					{question.active ? (
						<TextTag text="Active" color="green" />
					) : (
						<TextTag text="Inactive" color="red" />
					)}
					<TextTag text={`Weight: ${question?.answerWeight}`} color="indigo" />
				</div>
			</div>
			<RegularTextMont className="!text-lg">
				{question.questionText}
			</RegularTextMont>
			{question.descriptionText !== "" ? (
				<SmallGrayText>{question?.descriptionText as string}</SmallGrayText>
			) : null}
			<div className="w-full flex justify-between">
				{displayAnswers()}
				<div className="flex gap-2 items-end justify-end">
					<button
						onClick={() =>
							setShowModal({
								isActive: true,
								modalContent: question,
								modalType: "edit",
							})
						}
					>
						<SmallGrayText className="hover:!text-yellow-500 !transition-colors !ease-in-out !duration-200">
							Edit
						</SmallGrayText>
					</button>
					<button
						onClick={() =>
							setShowModal({
								isActive: true,
								modalContent: question,
								modalType: "delete",
							})
						}
					>
						<SmallGrayText className="hover:!text-red-500 !transition-colors !ease-in-out !duration-200">
							Delete
						</SmallGrayText>
					</button>
				</div>
			</div>
		</div>
	);
};

const SurveyQuestionsAdminCards = ({}) => {
	const { user } = useAuthContext();
	const queryClient = useQueryClient();
	const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
	const [reorderLoading, setReorderLoading] = useState<boolean>(false);
	const [reorderError, setReorderError] = useState<string | null>(null);
	const [category, setCategory] = useState<string>("Communication");
	const [version, setVersion] = useState<number>(1);
	const [showModal, setShowModal] = useState<{
		isActive: boolean;
		modalContent: SurveyQuestion | null;
		modalType: "add" | "delete" | "edit" | null;
	}>({ isActive: false, modalContent: null, modalType: null });
	const { data, isLoading, isError, error } = useQuery(
		["admin", "survey-questions", category],
		() => getAdminCategoryQuestions(user, version, category),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);

	const handleReorder = async () => {
		setReorderLoading(true);
		try {
			await reorderSurveyQuestions(user, questions);
			queryClient.invalidateQueries({
				queryKey: ["admin", "survey-questions", category],
				refetchInactive: true,
			});
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				setReorderError(
					error.response?.data.errorMessage
						? error.response.data.errorMessage
						: error
				);
			}
		}
		setReorderLoading(false);
	};

	const handleDataState = () => {
		const handleDragEnd = (result: DropResult) => {
			const tempSelections = [...questions];
			const [reorderd] = tempSelections.splice(result.source.index, 1);
			tempSelections.splice(result?.destination?.index as number, 0, reorderd);
			setQuestions(tempSelections);
		};

		if (isLoading || reorderLoading) {
			return (
				<div className="pt-10">
					<PageLoading />
				</div>
			);
		}

		if (isError || reorderError) {
			const queryError = error as unknown;
			if (queryError instanceof AxiosError) {
				return (
					<div className="relative h-full w-full flex flex-col justify-center items-center text">
						<p>{`Something went wrong${
							error ? `: ${queryError?.response?.data.errorMessage}` : ""
						}`}</p>
					</div>
				);
			}
		}

		return (
			<DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
				<Droppable droppableId="survey-questions">
					{(provided, snapshot) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{questions?.map((question, index: number) => (
								<Draggable
									key={"question-draggable" + question._id}
									draggableId={question._id}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<SurveyQuestionsAdminCard
												key={"question-card" + question._id}
												question={question}
												setShowModal={setShowModal}
												questionsIndex={index + 1}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	};

	useEffect(() => {
		setQuestions(data);
	}, [data]);

	return (
		<>
			{showModal.isActive ? (
				<ModalWrapper showModal={showModal} setShowModal={setShowModal}>
					<AdminSurveyQuestionsModalContent
						questions={data}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</ModalWrapper>
			) : null}
			<div className="flex flex-col">
				<div className="pt-4 sticky top-0 left-0 w-full bg-[#fffdf3] border-b-2 border-gray-400">
					<div className="flex pb-4">
						<AdminActionButton
							className="mr-2 h-min"
							disabled={questions === data ? true : false}
							text="Update Order"
							type="button"
							color="blue"
							onClick={() => handleReorder()}
						/>
						<AdminActionButton
							className="h-min"
							text="Add"
							type="button"
							color="green"
							onClick={() =>
								setShowModal({
									isActive: true,
									modalContent: null,
									modalType: "add",
								})
							}
						/>
						<div className="pl-1">
							<SmallGrayText className="!text-xs">
								Version: {version}
							</SmallGrayText>
							<SmallGrayText className="!text-xs">
								Category: {category}
							</SmallGrayText>
						</div>
					</div>
					<AdminCategoryButtons setCategory={setCategory} />
				</div>
				{handleDataState()}
			</div>
		</>
	);
};

export default SurveyQuestionsAdminCards;
