import { useQuery, useQueryClient } from "react-query";
import { getAssessmentCategoryScore } from "utils";
import { AxiosError } from "axios";
import CompareAnswersCards from "ui/DisplayCards/CompareAnswersCards";
import { useRouter } from "next/router";
import { useAuthContext } from "context";
import PageLoading from "ui/Loading/PageLoading";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";

const Index: NextPageWithLayout = () => {
	const router = useRouter();
	const { partner, category } = router.query;
	const { user } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		["partner-compatibility", "category-score", { partner, category }, user],
		() =>
			getAssessmentCategoryScore(user, partner as string, category as string),
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
			{!data ? null : (
				<CompareAnswersCards
					categoryScore={Math.floor((data?.dateScore / data?.totalScore) * 100)}
				/>
			)}
		</>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
