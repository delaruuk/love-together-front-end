import { useState, useEffect, useRef, JSXElementConstructor } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import {
	PostSurveyAnswer,
	SurveyAnswerDisplay,
	SurveyQuestion,
	UserQuestion,
} from "models";
import MultiStepFormQuestion from "./MultiStepFormQuestion";
import ProgressBar from "./ProgressBar";

import { convertCategoryString, createUser, postAnswers } from "utils";
import { useAuthContext } from "context";
import PageLoading from "../Loading/PageLoading";

import { AxiosError } from "axios";
import TitleText from "../Text/TitleText";

interface MultiStepFormProps {
	category: string;
	answers?: SurveyAnswerDisplay[] | null;
	questions: SurveyQuestion[] | UserQuestion[];
	submitType: "create-user" | "submit-compatibility";
}

const MultiStepForm = ({
	category,
	answers,
	questions,
	submitType,
}: MultiStepFormProps) => {
	const queryClient = useQueryClient();
	const { user, userLoading, userInfo, userInfoLoading, setUserInfo } =
		useAuthContext();
	const router = useRouter();
	const [page, setPage] = useState<number>(0);
	const [isValidated, setIsValidated] = useState<boolean>(false);
	const [formValues, setFormValues] = useState<{
		[key: string]: any[];
	}>({});
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [codeValidated, setCodeValidated] = useState<boolean>(false);

	const getCurrentKey = (key: string) => {
		const currentKey = key as keyof typeof formValues;
		return currentKey;
	};

	const handleBackClick = () => {
		if (page !== 0) {
			setPage(page - 1);
		}
	};

	const handleNextClick = () => {
		if (page !== questions?.length - 1) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		// prefill form with already answered questions
		if (answers && answers.length > 0) {
			let oldAnswers: { [key: string]: string[] | number[] } = {};
			answers.forEach((answer) => {
				const answerKey = answer.qId as string;
				const answerValue = answer.answer;
				oldAnswers[answerKey] = answerValue;
			});
			setFormValues(oldAnswers);
		}

		// get input for arrow keys
		// document.onkeydown = (e) => {
		// 	e = e || window.event;
		// 	console.log(e.key);
		// 	if (e.key === "ArrowLeft" || e.key === "a") {
		// 		console.log("left arrow pressed");
		// 		handleBackClick();
		// 	} else if ((e.key === "d" || e.key === "ArrowRight") && isValidated) {
		// 		handleNextClick();
		// 		console.log("right arrow pressed");
		// 	}
		// };

		// return () => {
		// 	document.onkeydown = (e) => {
		// 		e = e || window.event;
		// 	};
		// };
	}, []);

	const handleSubmit = async () => {
		if (user) {
			switch (submitType) {
				case "submit-compatibility":
					setIsLoading(true);
					try {
						await postAnswers(
							user,
							userInfo,
							formValues,
							questions as SurveyQuestion[],
							getCurrentKey
						);
						await queryClient.invalidateQueries({
							queryKey: "compatibility-categories",
							refetchInactive: true,
						});
						queryClient.invalidateQueries({
							queryKey: `${convertCategoryString(category as string)}`,
							refetchInactive: true,
						});
						queryClient.invalidateQueries({
							queryKey: "partner-compatibility",
							refetchInactive: true,
						});
						await router.push("/compatibility/questions");
						setIsLoading(false);
					} catch (error) {
						if (error instanceof AxiosError) {
							setError(error?.response?.data?.errorMessage);
							setIsLoading(false);
						}
						setIsLoading(false);
					}
					break;
				case "create-user":
					setIsLoading(true);
					try {
						const userData = await createUser(user, formValues);
						setUserInfo(userData);
						await router.push("/compatibility/questions");
						setIsLoading(false);
					} catch (error) {
						if (error instanceof AxiosError) {
							setError(error?.response?.data?.errorMessage);
							setIsLoading(false);
						}
						setIsLoading(false);
					}
					break;
				default:
					break;
			}
		}
	};

	const chooseRedirect = () => {
		switch (submitType) {
			case "create-user":
				return "/home";
			case "submit-compatibility":
				return "/compatibility/questions";
			default:
				break;
		}
	};

	if (isLoading) {
		return <PageLoading />;
	}

	return (
		<form
			className="relative h-full w-full flex flex-col justify-center items-center"
			onSubmit={(event) => event.preventDefault()}
			onKeyDown={(event) => console.log(event.key)}
		>
			<TitleText className="pb-4 text-center" text={category} />
			<MultiStepFormQuestion
				key={questions[page]?._id} // unique key to force rerender when questions array changes
				question={questions[page]}
				formValues={formValues}
				setFormValues={setFormValues}
				setIsValidated={setIsValidated}
				codeValidated={codeValidated}
				setCodeValidated={setCodeValidated}
				getCurrentKey={getCurrentKey}
			/>
			<div
				className={`fixed bottom-0 right-0 mx-4 my-4 flex flex-col items-end justify-center bg-main overflow-hidden border-2 ${
					error ? "border-red-500" : "border-main"
				} rounded`}
			>
				<div
					className={`py-2 px-4 w-full flex ${
						error
							? "bg-red-500 text-white justify-between"
							: "bg-[#fffdf3] text-main justify-end"
					}`}
				>
					{error ? <p className="pr-2 text-sm">Error</p> : null}
					<ProgressBar page={page} questionsLength={questions?.length} />
				</div>
				<div className="pt-4/5 text-white rounded-sm overflow-hidden">
					<button
						className="py-2 px-4 hover:bg-main-dark transition-colors ease-in-out duration-200"
						type="button"
						onClick={() => router.push(chooseRedirect() as string)}
					></button>
					<button
						className="py-2 px-4 hover:bg-main-dark transition-colors ease-in-out duration-200"
						type="button"
						onClick={() => handleBackClick()}
					>
						{"<"}
					</button>
					{isValidated ? (
						<>
							{page === questions?.length - 1 ? (
								<button
									className={`py-2 px-4 ${
										page === questions?.length - 1
											? "bg-blue-600 hover:bg-blue-700"
											: "bg-main hover:bg-main-dark"
									}  transition-colors ease-in-out duration-200`}
									type="button"
									onClick={() => handleSubmit()}
								>
									{">"}
								</button>
							) : (
								<button
									className="py-2 px-4 bg-main hover:bg-main-dark transition-colors ease-in-out duration-200"
									type="button"
									onClick={() => handleNextClick()}
								>
									{">"}
								</button>
							)}
						</>
					) : (
						<button
							className="py-2 px-4 bg-gray-400"
							type="button"
							disabled={true}
							onClick={() => handleNextClick()}
						>
							{">"}
						</button>
					)}
				</div>
			</div>
		</form>
	);
};

export default MultiStepForm;
