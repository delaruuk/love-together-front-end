import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";
import { useAuthContext } from "context";
import { Category, PartnerCategoryOverview } from "models";
import {
	convertCategoryString,
	getAssessmentCategoryScore,
	getCategories,
	getCompareAnswers,
	getCompareUsers,
} from "utils";
import PageLoading from "../Loading/PageLoading";
import { AxiosError } from "axios";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import RegularTextMont from "../Text/RegularTextMont";

type PartnerCategoryLinkCardProps = {
	category: PartnerCategoryOverview;
};

const PartnerCategoryLinkCard = ({
	category,
}: PartnerCategoryLinkCardProps) => {
	const router = useRouter();
	const { shareCode } = router.query;

	const chooseColor = () => {
		if (
			category?.dateScore >= 0 &&
			category?.totalScore >= 0 &&
			category.isCompleted
		) {
			const catScore = Math.floor(
				(category?.dateScore / category?.totalScore) * 100
			);
			if (catScore >= 70) {
				return "bg-compatibility-great border-2 border-compatibility-great";
			} else if (catScore < 70 && catScore >= 40) {
				return "bg-compatibility-good border-2 border-compatibility-good";
			} else if (catScore < 40) {
				return "bg-compatibility-bad border-2 border-compatibility-bad";
			}
		}
		return "border-2 border-gray-500";
	};

	return (
		<Link
			className="p-3 flex items-center justify-between bg-white shadow-md shadow-gray-400  rounded-md hover:scale-105 transition-transform ease-in-out duration-200"
			href={{
				pathname: "/partners/assessment",
				query: {
					partner: shareCode,
					category: category.category,
				},
			}}
		>
			<div className="flex items-center overflow-hidden">
				<span
					className={`mr-2 p-3 rounded-full border-2 ${chooseColor()}`}
				></span>
				<RegularTextMont className="capitalize truncate">
					{category.category}
				</RegularTextMont>
			</div>
			<p>{">"}</p>
		</Link>
	);
};

type PartnerCategoryLinkCardsProps = {};

const PartnerCategoryLinkCards = ({}: PartnerCategoryLinkCardsProps) => {
	const router = useRouter();
	const { shareCode } = router.query;
	const { user, userInfo } = useAuthContext();

	const { data, isLoading, isError, error } = useQuery(
		["partner-compatibility", "categories", { partner: shareCode }, user],
		() => getCompareUsers(user, shareCode as string),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
			retry: false,
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
			<div className="pb-4">
				<TitleText text="Love Road Map" />
				<RegularTextMont className="!text-lg !font-semibold">
					Time to discuss
				</RegularTextMont>
				<RegularTextMont className="!text-gray-500 font-">
					Partner: {data?.partner}
				</RegularTextMont>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data?.freeCatScores.map(
					(category: PartnerCategoryOverview, index: number) => (
						<PartnerCategoryLinkCard key={index} category={category} />
					)
				)}
				{userInfo?.subscriptionStatus === "Premium"
					? data?.premiumCatScores.map(
							(category: PartnerCategoryOverview, index: number) => (
								<PartnerCategoryLinkCard key={index} category={category} />
							)
					  )
					: data?.premiumCatScores.map(
							(category: PartnerCategoryOverview, index: number) => (
								<PartnerCategoryCardHidden key={index} category={category} />
							)
					  )}
			</div>
			<div className="mx-auto max-w-4xl">
				<div className="pt-4 flex flex-wrap items-center justify-center gap-4">
					<div className="flex items-center">
						<span className="mr-2 p-3 h-min rounded-full bg-compatibility-great border-2 border-compatibility-great"></span>
						<RegularTextMont className="!font-normal">
							Celebratory Conversation
						</RegularTextMont>
					</div>
					<div className="flex items-center">
						<span className="mr-2 p-3 h-min rounded-full bg-compatibility-good border-2 border-compatibility-good"></span>
						<RegularTextMont className="!font-normal">
							Gentle Conversation
						</RegularTextMont>
					</div>
					<div className="flex items-center">
						<span className="mr-2 p-3 h-min rounded-full bg-compatibility-bad border-2 border-compatibility-bad"></span>
						<RegularTextMont className="!font-normal">
							Empathetic Conversation
						</RegularTextMont>
					</div>
					<div className="flex items-center">
						<span className="mr-2 p-3 h-min rounded-full bg-transparent border-2 border-gray-500"></span>
						<RegularTextMont className="!font-normal">
							Not Assessed
						</RegularTextMont>
					</div>
				</div>
				<SmallGrayText className="pt-1 text-center">
					Please use this assessment to spark discussion. Done with love,
					together, many relationships will set themselves up for success.
					Always remember kindness, empathy, patience, and an open mind
				</SmallGrayText>
			</div>
		</>
	);
};

export default PartnerCategoryLinkCards;

type PartnerCategoryCardHiddenProps = {
	category: PartnerCategoryOverview;
};

const PartnerCategoryCardHidden = ({
	category,
}: PartnerCategoryCardHiddenProps) => {
	const router = useRouter();

	return (
		<div className="p-3 flex items-center justify-between bg-white shadow-md shadow-gray-400 opacity-60">
			<div className="flex item-center overflow-hidden">
				<span
					className={`mr-2 p-3 rounded-full bg-gray-500 border-2 border-gray-500 `}
				></span>
				<RegularTextMont className="capitalize truncate">
					{category.category}
				</RegularTextMont>
			</div>
			<p>{">"}</p>
		</div>
	);
};
