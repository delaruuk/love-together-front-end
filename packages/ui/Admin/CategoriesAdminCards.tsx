import { ReactElement, useState } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "context";
import { useQuery } from "react-query";
import { getAdminCategories, getUsers } from "utils";
import type {
	Category,
	MongoUser,
	NextPageWithLayout,
	SurveyQuestion,
} from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import PageLoading from "ui/Loading/PageLoading";
import AdminActionButton from "../Buttons/AdminActionButton";
import SmallGrayText from "../Text/SmallGrayText";
import Image from "next/image";
import TextTag from "../Text/TextTag";
import ModalWrapper from "../Modals/ModalWrapper";
import AdminCategoriesModalContent from "../Modals/AdminCategoriesModalContent";
import RegularTextMont from "../Text/RegularTextMont";

interface CategoriesAdminCardProps {
	category: Category;
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: Category | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
}

const CategoriesAdminCard = ({
	category,
	setShowModal,
}: CategoriesAdminCardProps) => {
	return (
		<div className="first:pt-0 py-2 flex items-center border-b-2 border-gray-400">
			<Image
				className="pr-2"
				src={category.categoryImage}
				alt="category icon"
				width={"55"}
				height={"55"}
			/>
			<div className="w-full">
				<div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
					<SmallGrayText>{category._id}</SmallGrayText>
					<TextTag
						className="w-max"
						color={
							category.subscriptionStatus === "Premium" ? "green" : "indigo"
						}
						text={category.subscriptionStatus}
					/>
				</div>
				<div className="w-full flex justify-between">
					<RegularTextMont>
						{category.categoryId}. {category.category}
					</RegularTextMont>
					<div className="flex items-end justify-end">
						{/* <button
							onClick={() =>
								setShowModal({
									isActive: true,
									modalContent: category,
									modalType: "edit",
								})
							}
							className="mr-2"
						>
							<SmallGrayText className="hover:!text-yellow-500 !transition-colors !ease-in-out !duration-200">
								Edit
							</SmallGrayText>
						</button>
						<button
							onClick={() =>
								setShowModal({
									isActive: true,
									modalContent: category,
									modalType: "delete",
								})
							}
						>
							<SmallGrayText className="hover:!text-red-500 !transition-colors !ease-in-out !duration-200">
								Delete
							</SmallGrayText>
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

const CategoriesAdminCards = () => {
	const { user } = useAuthContext();
	const [showModal, setShowModal] = useState<{
		isActive: boolean;
		modalContent: Category | null;
		modalType: "add" | "delete" | "edit" | null;
	}>({ isActive: false, modalContent: null, modalType: null });
	const [modalLoading, setModalLoading] = useState<boolean>(false);
	const [modalError, setModalError] = useState<string>("");
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
			{showModal.isActive ? (
				<ModalWrapper showModal={showModal} setShowModal={setShowModal}>
					<AdminCategoriesModalContent
						categories={data}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</ModalWrapper>
			) : null}
			<div className="py-4 sticky top-0 left-0 w-full bg-[#fffdf3] border-b-2 border-gray-400">
				<AdminActionButton
					text="Add category"
					type="button"
					disabled={true}
					color="green"
					onClick={() =>
						setShowModal({
							isActive: true,
							modalContent: null,
							modalType: "add",
						})
					}
				/>
			</div>
			{data?.map((category: Category) => (
				<CategoriesAdminCard
					key={category?._id}
					category={category}
					setShowModal={setShowModal}
				/>
			))}
		</>
	);
};

export default CategoriesAdminCards;
