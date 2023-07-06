import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import {
	getCategoryCompleted,
	convertCategoryString,
	getCategories,
} from "utils";
import { useAuthContext } from "context";
import { Category } from "models";
import PageLoading from "../Loading/PageLoading";
import { useRouter } from "next/router";

import { AxiosError } from "axios";
import TitleText from "../Text/TitleText";
import TextLink from "./TextLink";
import TextTag from "../Text/TextTag";
import RegularTextMont from "../Text/RegularTextMont";
import { useEffect } from "react";

type CategoryLinkCardProps = {
	imgSrc: string;
	link: string;
	queryParam: string;
	text: string;
	titleText: string;
};

const CategoryLinkCard = ({
	imgSrc,
	link,
	queryParam,
	text,
	titleText,
}: CategoryLinkCardProps) => {
	const router = useRouter();
	const { user } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		[`${convertCategoryString(text)}`, { type: "completed" }, user],
		() => getCategoryCompleted(user, text),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);

	const ProgressCheck = () => {
		if (isLoading) {
			return <TextTag className="animate-pulse" text="Loading" color="sky" />;
		}
		if (isError) {
			const queryError = error as unknown;
			if (queryError instanceof AxiosError) {
				return <TextTag text="Error" color="red" />;
			}
		}
		if (data === "done") {
			return (
				<TextTag
					text={router.asPath === "/insights" ? "Insight" : "Done"}
					color="green"
				/>
			);
		}
		if (data === "review") {
			return <TextTag text="Review" color="indigo" />;
		}
		if (data === "incomplete") {
			return <TextTag text="To do" color="yellow" />;
		} else
			return <TextTag className="animate-pulse" text="Loading" color="sky" />;
	};

	return (
		<Link
			className="p-3 sm:inline flex bg-white shadow-md shadow-gray-400  rounded-md hover:scale-105 transition-transform ease-in-out duration-200"
			href={{
				pathname: link,
				query: {
					category: queryParam,
				},
			}}
		>
			<Image
				className="sm:mx-auto pr-2 sm:pr-0"
				src={imgSrc}
				alt={text}
				width={"50"}
				height={"50"}
			/>
			<div className="sm:pt-3 w-full flex justify-between items-center overflow-hidden">
				<RegularTextMont className="capitalize truncate">
					{text}
				</RegularTextMont>
				<div className="flex items-center [&>span]:mx-2">
					<ProgressCheck />
					<p>{">"}</p>
				</div>
			</div>
		</Link>
	);
};

interface CategoryLinkCardsProps {
	titleText: string;
	titleDescriptionText: string;
}

const CategoryLinkCards = ({
	titleText,
	titleDescriptionText,
}: CategoryLinkCardsProps) => {
	const router = useRouter();
	const { user, userInfo } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		["compatibility-categories", user],
		() => getCategories(user),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
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

	return (
		<>
			<div className="pb-4 grid grid-cols-1 lg:grid-cols-4">
				<div className="col-span-3">
					<TitleText
						className="animate-[bounce_1s_ease-in-out_2.5]"
						text={titleText}
					/>
					<RegularTextMont className="!text-lg !font-semibold">
						{titleDescriptionText}
					</RegularTextMont>
				</div>
				<div className="w-full flex items-start lg:items-end lg:justify-end ">
					<RegularTextMont className="!text-gray-500">
						Click{" "}
						<TextLink
							className="text-base"
							link={`/compatibility/${
								router.asPath.includes("questions") ? "answers" : "questions"
							}`}
						>
							here
						</TextLink>{" "}
						{router.asPath.includes("questions")
							? "view your answers"
							: "answer questions"}
					</RegularTextMont>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data?.freeCategories.map((category: Category) => (
					<CategoryLinkCard
						key={category._id}
						imgSrc={category.categoryImage}
						link={`${router.asPath}/category`}
						queryParam={category.category}
						text={category.category}
						titleText={titleText}
					/>
				))}
				{data?.premiumCategories.map((category: Category) => (
					<CategoryLinkCard
						key={category._id}
						imgSrc={category.categoryImage}
						link={`${router.asPath}/category`}
						queryParam={category.category}
						text={category.category}
						titleText={titleText}
					/>
				))}
			</div>
		</>
	);
};

export default CategoryLinkCards;
