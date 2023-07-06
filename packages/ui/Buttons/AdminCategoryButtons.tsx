import type { Category } from "models";
import { useAuthContext } from "context";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getAdminCategories } from "utils";

type AdminCategoryButtonsProps = {
	setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const AdminCategoryButtons = ({ setCategory }: AdminCategoryButtonsProps) => {
	const { user } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		["admin", "survey-categories"],
		() => getAdminCategories(user),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);

	if (isLoading) {
		return (
			<button
				disabled={true}
				type="button"
				className={`mb-4 p-2 min-w-max font-kumbh font-semibold text-sm rounded-full text-gray-500 hover:text-main  border-2 border-gray-400 animate-pulse`}
			>
				Loading
			</button>
		);
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
		<div className="pb-4 flex gap-2 overflow-scroll">
			{data.map((category: Category) => (
				<button
					key={category?._id}
					type="button"
					className={`p-2 min-w-max font-kumbh font-semibold text-sm rounded-full text-gray-500 hover:text-main  border-2 border-gray-400 hover:border-main transition-colors ease-in-out duration-200`}
					onClick={() => setCategory(category.category)}
				>
					{category.category}
				</button>
			))}
		</div>
	);
};

export default AdminCategoryButtons;
