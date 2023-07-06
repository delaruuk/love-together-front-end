import { useQuery } from "react-query";
import { convertCategoryString, getQuestionsByCategory } from "utils";

import MultiStepForm from "ui/MultiStepForm/MultiStepForm";
import { useAuthContext } from "context";
import PageLoading from "ui/Loading/PageLoading";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";

const Index: NextPageWithLayout = () => {
	const router = useRouter();
	const category = router.query.category as string;
	const { user, userLoading } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		[`${convertCategoryString(category)}`, { type: "questions" }, user],
		() => getQuestionsByCategory(user, category),
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
			{data ? (
				<MultiStepForm
					category={category}
					answers={data.answers}
					questions={data.questions}
					submitType="submit-compatibility"
				/>
			) : null}
		</>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
