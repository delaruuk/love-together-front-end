import type { NextPageWithLayout } from "models";
import { useQuery } from "react-query";
import { UserQuestion } from "models";
import { getUserQuestions } from "utils";
import { useAuthContext } from "context";
import { AxiosError } from "axios";
import AuthLayout from "ui/Layouts/AuthLayout";
import MultiStepForm from "ui/MultiStepForm/MultiStepForm";
import PageLoading from "ui/Loading/PageLoading";
import TextLink from "ui/Links/TextLink";

const Index: NextPageWithLayout = () => {
	const { userInfo, userInfoLoading, user } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		`user-questions`,
		() => getUserQuestions(user),
		{
			refetchOnWindowFocus: false,
			enabled: !!user,
		}
	);

	if (isLoading || userInfoLoading) {
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

	if (userInfo && userInfoLoading === false) {
		return (
			<div className="relative h-full w-full flex flex-col justify-center items-center text">
				<p>
					You have already signed up! Please return{" "}
					<TextLink link="/home">home</TextLink>
				</p>
			</div>
		);
	}

	return (
		<MultiStepForm
			category="Tell us more about yourself"
			questions={[
				...[
					{
						_id: "name",
						__v: 0,
						answerTypeId: 5,
						label: "name",
						questionText: "What's your name?",
						answers: [],
					},
					{
						_id: "shareCode",
						__v: 0,
						answerTypeId: 99,
						label: "shareCode",
						questionText: "Create share code",
						answers: [],
					},
					{
						_id: "birth",
						__v: 0,
						answerTypeId: 98,
						label: "birth",
						questionText: "What's your date of birth?",
						answers: [],
					},
				],
				...data?.map((question: UserQuestion) => {
					return {
						_id: question.label,
						__v: question.__v,
						answerTypeId: question.answerTypeId,
						label: question.label,
						questionText: question.questionText,
						answers: question.answers,
					};
				}),
			]}
			submitType="create-user"
		/>
	);
};

Index.getLayout = function getLayout(page: React.ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
