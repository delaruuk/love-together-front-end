import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useAuthContext } from "context";
import { convertCategoryString, getAnswersByCategory } from "utils";
import { SurveyAnswerDisplay } from "models";

import Link from "next/link";
import TextLink from "ui/Links/TextLink";
import PageLoading from "ui/Loading/PageLoading";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import RegularTextMont from "../Text/RegularTextMont";

const InsightsLinkCards = () => {
	const router = useRouter();
	const category = router.query.category as string;
	const { user, userInfo } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		[`${convertCategoryString(category)}`, { type: "answers" }, user, userInfo],
		() => getAnswersByCategory(user, category),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user && !!userInfo,
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

	if (!isLoading && !isError && data && data.length === 0) {
		return (
			<div className="relative h-full w-full flex flex-col justify-center items-center text-center">
				<p>
					Please fill out the{" "}
					<TextLink
						link="/compatibility/questions/category"
						queryName="category"
						queryParam={category}
					>
						{category}
					</TextLink>{" "}
					category questions
				</p>
			</div>
		);
	}
	return (
		<>
			<div className="pb-4 flex items-center justify-start [&>a]:scale-150 animate-[bounce_1s_ease-in-out_2.5]">
				<TextLink link="/insights">{"<"}</TextLink>
				<TitleText className="ml-2" text={category} />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data?.map((answer: SurveyAnswerDisplay) => (
					<InsightsLinkCard
						key={answer?._id}
						answer={answer as SurveyAnswerDisplay}
					/>
				))}
			</div>
		</>
	);
};

type InsightsLinkCardProps = {
	answer: SurveyAnswerDisplay;
};

const InsightsLinkCard = ({ answer }: InsightsLinkCardProps) => {
	if (
		answer?.question_info[0]?.answerTypeId === 1 ||
		answer?.question_info[0]?.answerTypeId === 2
	) {
		const selectedAnswer = answer?.question_info[0].answers.filter(
			(selection: any) => selection.ansId === answer.answer[0]
		);
		return (
			<Link
				href={{
					pathname: "/insights/insight",
					query: {
						qId: answer.qId,
					},
				}}
				className="p-3 shadow-md shadow-gray-400 rounded-md bg-white hover:scale-105 transition-transform ease-in-out duration-200"
			>
				<RegularTextMont className="!text-lg">
					{answer?.question_info[0].questionText}
				</RegularTextMont>
				{answer?.question_info[0].answerTypeId === 1 ? (
					<SmallGrayText className="pb-1">
						0 - strongly disagree, 10 - strongly agree
					</SmallGrayText>
				) : null}
				<RegularTextMont className="pl-2 !font-normal border-l-2 border-main">
					You said:{" "}
					<span className="font-medium">{selectedAnswer[0]?.answer}</span>
				</RegularTextMont>
			</Link>
		);
	}

	return (
		<Link
			href={{
				pathname: "/insights/insight",
				query: {
					qId: answer.qId,
				},
			}}
			className="p-3 shadow-md shadow-gray-400 rounded-md bg-white hover:scale-105 transition-transform ease-in-out duration-200"
		>
			<RegularTextMont className="text-lg">
				{answer?.question_info[0].questionText}
			</RegularTextMont>
			{answer?.question_info[0].answerTypeId === 4 ? (
				<SmallGrayText className="pb-1">
					1 - most important to least important
				</SmallGrayText>
			) : null}
			{answer?.question_info[0].answerTypeId === 4 ? (
				<div className="pl-2 border-l-2 border-main">
					<RegularTextMont className="!font-normal">You said:</RegularTextMont>
					{answer?.answer?.map((selection: string | number, index: number) => (
						<RegularTextMont key={((selection as string) + index) as string}>
							{index + 1} - {selection}
						</RegularTextMont>
					))}
				</div>
			) : (
				<RegularTextMont className="pl-2 !font-normal border-l-2 border-main">
					You said:
					<span className="font-medium">
						{answer?.answer?.map((selection: string | number, index: number) =>
							index !== answer.answer.length - 1
								? ` ${selection}, `
								: ` ${selection}`
						)}
					</span>
				</RegularTextMont>
			)}
		</Link>
	);
};

export default InsightsLinkCards;
