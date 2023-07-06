import { ReactElement, useContext, useEffect, useState } from "react";
import type {
	NextPageWithLayout,
	UserQuestion,
	SurveyQuestion,
	SurveyQuestionAnswerAlternate,
	SurveyQuestionAnswerPrimary,
} from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import { getAdminUserQuestions } from "utils";
import { AuthContext, useAuthContext } from "context";
import { useQuery, useQueryClient } from "react-query";
import PageLoading from "../Loading/PageLoading";
import { AxiosError } from "axios";
import AdminActionButton from "../Buttons/AdminActionButton";
import SmallGrayText from "../Text/SmallGrayText";
import TextTag from "../Text/TextTag";
import ModalWrapper from "../Modals/ModalWrapper";
import AdminUserQuestionsModalContent from "../Modals/AdminUserQuestionsModalContent";
import RegularTextMont from "../Text/RegularTextMont";

interface UserQuestionsAdminCardProps {
	question: UserQuestion;
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: UserQuestion | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
}

const UserQuestionsAdminCard = ({
	question,
	setShowModal,
}: UserQuestionsAdminCardProps) => {
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
					<SmallGrayText>{`Selection limit: ${answers[0]}`}</SmallGrayText>
					{answers.map((answer, index) => {
						if (index >= 1) {
							return (
								<RegularTextMont
									key={question._id + index}
									className="!font-regular"
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
				<SmallGrayText className="pr-2">{question._id}</SmallGrayText>
				{question.hidden ? (
					<TextTag className="!max-w-max" color="indigo" text="Hidden" />
				) : (
					<TextTag className="!max-w-max" color="sky" text="Visible" />
				)}
			</div>
			<RegularTextMont className="!text-lg">
				{question.questionText}
			</RegularTextMont>
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
						<SmallGrayText className="hover:text-yellow-500 transition-colors ease-in-out duration-200">
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
						<SmallGrayText className="hover:text-red-500 transition-colors ease-in-out duration-200">
							Hide
						</SmallGrayText>
					</button>
				</div>
			</div>
		</div>
	);
};

const UserQuestionsAdminCards = () => {
	const { user } = useAuthContext();
	const [questions, setQuestions] = useState<UserQuestion[]>([]);
	const [showModal, setShowModal] = useState<{
		isActive: boolean;
		modalContent: UserQuestion | null;
		modalType: "add" | "delete" | "edit" | null;
	}>({ isActive: false, modalContent: null, modalType: null });
	const { data, isLoading, isError, error } = useQuery(
		["admin", "user-questions"],
		() => getAdminUserQuestions(user),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);

	if (isLoading) {
		return <PageLoading />;
	}

	if (isError) {
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
		<>
			{showModal.isActive ? (
				<ModalWrapper showModal={showModal} setShowModal={setShowModal}>
					<AdminUserQuestionsModalContent
						questions={data}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</ModalWrapper>
			) : null}
			<div className="py-4 sticky top-0 left-0 w-full bg-[#fffdf3] border-b-2 border-gray-400">
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
			</div>
			{data?.map((question: UserQuestion) => (
				<UserQuestionsAdminCard
					key={question._id}
					question={question}
					setShowModal={setShowModal}
				/>
			))}
		</>
	);
};

export default UserQuestionsAdminCards;
