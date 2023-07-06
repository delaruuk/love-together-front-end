import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";
import { useAuthContext } from "context";
import {
	CompareAnswerDisplay,
	PartnerCategoryOverview,
	SurveyQuestion,
} from "models";
import {
	convertCategoryString,
	getCompareAnswers,
	getCompareUsers,
} from "utils";
import PageLoading from "../Loading/PageLoading";
import TextLink from "../Links/TextLink";
import { AxiosError } from "axios";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import RegularTextMont from "../Text/RegularTextMont";

interface RenderDiscussionProps {
	categoryScore: number;
}

const RenderDiscussion = ({ categoryScore }: RenderDiscussionProps) => {
	const className = "mx-auto w-max !text-gray-500";
	if (categoryScore >= 70) {
		return (
			<RegularTextMont className={className}>
				Celebratory conversation
			</RegularTextMont>
		);
	} else if (categoryScore < 70 && categoryScore >= 40) {
		return (
			<RegularTextMont className={className}>
				Gentle conversation
			</RegularTextMont>
		);
	} else if (categoryScore < 40) {
		return (
			<RegularTextMont className={className}>
				Empathetic conversation
			</RegularTextMont>
		);
	} else {
		return (
			<RegularTextMont className={className}>Not assessed</RegularTextMont>
		);
	}
};

type CompareAnswersCardProps = {
	question: any;
	user1Answer: any;
	user2Answer: any;
};

const CompareAnswersCard = ({
	question,
	user1Answer,
	user2Answer,
}: CompareAnswersCardProps) => {
	const user1SelectedAnswer = question.answers.filter(
		(selection: any) => selection.ansId === user1Answer?.answer[0]
	);
	const user2SelectedAnswer = question.answers.filter(
		(selection: any) => selection.ansId === user2Answer?.answer[0]
	);

	if (question?.answerTypeId === 1 || question?.answerTypeId === 2) {
		return (
			<div className="p-3 max-w-md w-full shadow-md shadow-gray-400 rounded-md bg-white">
				<RegularTextMont className="!text-lg">
					{question.questionText}
				</RegularTextMont>
				{question.answerTypeId === 1 ? (
					<SmallGrayText className="pb-1">
						0 - strongly disagree, 10 - strongly agree
					</SmallGrayText>
				) : null}
				<RegularTextMont className="pl-2 !font-normal border-l-2 border-main ">
					You said:{" "}
					<span className="!font-medium">{user1SelectedAnswer[0]?.answer}</span>
				</RegularTextMont>
				{user2Answer ? (
					<RegularTextMont className="pl-2 !font-normal border-l-2 border-main ">
						They said:{" "}
						<span className="font-medium">
							{user2SelectedAnswer[0]?.answer}
						</span>
					</RegularTextMont>
				) : (
					<RegularTextMont className="pl-2 !font-normal border-l-2 border-main ">
						Your partner has not answered this question
					</RegularTextMont>
				)}
			</div>
		);
	}

	return (
		<div className="p-3 max-w-md w-full shadow-md shadow-gray-400 rounded-md bg-white">
			<RegularTextMont className="!text-lg">
				{question.questionText}
			</RegularTextMont>
			{question.answerTypeId === 4 ? (
				<SmallGrayText className="pb-1">
					1 - most important to least important
				</SmallGrayText>
			) : null}
			{user1Answer ? (
				<RegularTextMont className="pl-2 !font-normal border-l-2 border-main">
					You said:
					{question.answerTypeId === 4 ? (
						<span className="flex flex-col font-medium">
							{user1Answer?.answer.map(
								(selection: number | string, index: number) => (
									<span key={index}>
										{index + 1} - {selection}
									</span>
								)
							)}
						</span>
					) : (
						<span className="font-medium">
							{user1Answer?.answer.map(
								(selection: number | string, index: number) =>
									index !== user1Answer?.answer.length - 1
										? ` ${selection}, `
										: ` ${selection}`
							)}
						</span>
					)}
				</RegularTextMont>
			) : (
				<RegularTextMont className="pl-2 !font-normal border-l-2 border-main">
					You have not answered this question
				</RegularTextMont>
			)}

			{user2Answer ? (
				<RegularTextMont className="pl-2 !font-normal border-l-2 border-main">
					They said:
					{question.answerTypeId === 4 ? (
						<span className="flex flex-col font-medium">
							{user2Answer?.answer.map(
								(selection: number | string, index: number) => (
									<span key={index}>
										{index + 1} - {selection}
									</span>
								)
							)}
						</span>
					) : (
						<span className="font-medium">
							{user2Answer?.answer.map(
								(selection: number | string, index: number) =>
									index !== user1Answer?.answer.length - 1
										? ` ${selection}, `
										: ` ${selection}`
							)}
						</span>
					)}
				</RegularTextMont>
			) : (
				<RegularTextMont className="pl-2 !font-normal border-l-2 border-main">
					Your partner has not answered this question
				</RegularTextMont>
			)}
		</div>
	);
};

interface CompareAnswerCards {
	categoryScore: number;
}

const CompareAnswersCards = ({ categoryScore }: CompareAnswerCards) => {
	const router = useRouter();
	const { partner, category } = router.query;
	const { user } = useAuthContext();

	const { data, isLoading, isError, error } = useQuery(
		[["partner-compatibility", "assessment", { partner, category }, user]],
		() => getCompareAnswers(user, partner as string, category as string),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);

	const chooseColor = () => {
		if (categoryScore >= 70) {
			return "bg-compatibility-great border-2 border-compatibility-great";
		} else if (categoryScore < 70 && categoryScore >= 40) {
			return "bg-compatibility-good border-2 border-compatibility-good";
		} else if (categoryScore < 40) {
			return "bg-compatibility-bad border-2 border-compatibility-bad";
		}
		return "border-2 border-gray-500";
	};

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

	if (
		data?.user1Answers &&
		data?.user1Answers.length === 0 &&
		data?.user1Answers &&
		data?.user2Answers.length > 0
	) {
		return (
			<div className="relative h-full w-full flex flex-col justify-center items-center text">
				<p>
					You need to complete this categories{" "}
					<TextLink
						link="/compatibility/questions/category"
						queryName="category"
						queryParam={category as string}
					>
						questions
					</TextLink>
				</p>
			</div>
		);
	}

	if (
		data?.user2Answers &&
		data?.user2Answers.length === 0 &&
		data?.user1Answers &&
		data?.user1Answers.length > 0
	) {
		return (
			<div className="relative h-full w-full flex flex-col justify-center items-center text">
				<p>Your partner needs to complete this categories questions</p>
			</div>
		);
	}

	if (
		data?.user1Answers &&
		data?.user2Answers &&
		data?.user2Answers.length === 0 &&
		data?.user1Answers.length === 0
	) {
		return (
			<div className="relative h-full w-full flex flex-col justify-center items-center text">
				<p>
					You and your partner need to complete this categories{" "}
					<TextLink
						link="/compatibility/questions/category"
						queryName="category"
						queryParam={category as string}
					>
						questions
					</TextLink>
				</p>
			</div>
		);
	}

	return (
		<div className="relative w-full min-h-full flex flex-col items-center justify-center">
			<div className="flex justify-center items-center text-lg font-bold w-full [&>a]:scale-150">
				<TextLink
					link="/partners/partner"
					queryName="shareCode"
					queryParam={partner as string}
				>
					{"<"}
				</TextLink>
				<span className={`mx-2 p-3 rounded-full ${chooseColor()}`}></span>
				<TitleText text={category as string} />
			</div>
			<RenderDiscussion categoryScore={categoryScore} />
			<div className="pt-4 [&>div]:mb-4 [&>div:last-child]:mb-0">
				{data?.questions.map((question: SurveyQuestion) => (
					<CompareAnswersCard
						key={question._id}
						question={question}
						user1Answer={
							data?.user1Answers.filter(
								(userAnswer: CompareAnswerDisplay) =>
									userAnswer.qId === question._id
							)[0]
						}
						user2Answer={
							data?.user2Answers.filter(
								(userAnswer: CompareAnswerDisplay) =>
									userAnswer.qId === question._id
							)[0]
						}
					/>
				))}
			</div>
		</div>
	);
};

export default CompareAnswersCards;
