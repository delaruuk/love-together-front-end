import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { useAuthContext } from "context";
import { getInsightByQuestion } from "utils";

import TitleText from "../Text/TitleText";
import RegularTextMont from "../Text/RegularTextMont";
import PageLoading from "../Loading/PageLoading";

const InsightInfoCards = () => {
	const router = useRouter();
	const qId = router.query.qId as string;
	const { user, userInfo } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		[qId, { type: "insights" }, user, userInfo],
		() => getInsightByQuestion(user, qId),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user && !!userInfo,
		}
	);

	useEffect(() => {
		console.log(data);
	}, [data]);

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
		(!isError &&
			!isLoading &&
			data.insight?.openingStatement === "" &&
			data.insight?.analysis.length === 0 &&
			data.insight?.impacts.length === 0 &&
			data.insight?.solutions.length === 0 &&
			data.insight?.closingStatement === "") ||
		!data.insight
	) {
		return (
			<div className="relative h-full w-full flex flex-col justify-center items-center text">
				<RegularTextMont>
					No insight available for this question
				</RegularTextMont>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-5xl">
			{data.insight?.openingStatement !== "" ? (
				<RegularTextMont className="pb-8">
					{data.insight?.openingStatement}
				</RegularTextMont>
			) : null}
			<div className="flex flex-col gap-8">
				<InsightInfoCardWrapper
					title="Analysis"
					insightSectionArray={data.insight?.analysis}
				/>
				<InsightInfoCardWrapper
					title="Impacts on your partner"
					insightSectionArray={data.insight?.impacts}
				/>
				<InsightInfoCardWrapper
					title="Possible solutions"
					insightSectionArray={data.insight?.solutions}
				/>
			</div>
			{data.insight?.closingStatement != "" ? (
				<RegularTextMont className="pt-8">
					{data.insight?.closingStatement}
				</RegularTextMont>
			) : null}
		</div>
	);
};

export default InsightInfoCards;

type InsightInfoCardWrapperProps = {
	title: string;
	insightSectionArray: string[];
};

const InsightInfoCardWrapper = ({
	title,
	insightSectionArray,
}: InsightInfoCardWrapperProps) => {
	if (!insightSectionArray || insightSectionArray?.length < 1) {
		return null;
	}

	return (
		<div className="p-4 shadow-md shadow-gray-400 rounded-md bg-white">
			<TitleText className="text-black !text-lg" text={title} />
			<div className="flex flex-col gap-4">
				{insightSectionArray.map((text, index) => (
					<RegularTextMont key={index} className="font-normal">
						{text}
					</RegularTextMont>
				))}
			</div>
		</div>
	);
};
