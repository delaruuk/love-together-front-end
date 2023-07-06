import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "context";
import { useQuery, useQueryClient } from "react-query";
import { getUsers, toggleAdmin, removeUser } from "utils";
import type { MongoUser } from "models";
import PageLoading from "ui/Loading/PageLoading";
import AdminActionButton from "../Buttons/AdminActionButton";
import SmallGrayText from "../Text/SmallGrayText";
import TextTag from "../Text/TextTag";
import ModalWrapper from "../Modals/ModalWrapper";
import TitleText from "../Text/TitleText";
import AdminUserModalContent from "../Modals/AdminUserModalContent";
import RegularTextMont from "../Text/RegularTextMont";

interface UserAdminCardProps {
	user: MongoUser;
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: MongoUser;
			modalType: "admin" | "delete" | "status" | null;
		}>
	>;
}

const UserAdminCard = ({ user, setShowModal }: UserAdminCardProps) => {
	return (
		<div className="first:pt-0 py-2 flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-gray-400">
			<div className="flex flex-col">
				<div className="flex flex-col md:flex-row md:items-center">
					<SmallGrayText className="pr-2">{user?._id as string}</SmallGrayText>
					<div className="flex gap-2">
						{user?.isAdmin ? <TextTag text="admin" color="indigo" /> : <></>}
						<TextTag text={`Version: ${user?.versionId}`} color="sky" />
						<TextTag
							text={user?.subscriptionStatus as string}
							color={
								user?.subscriptionStatus === "Premium" ? "green" : "yellow"
							}
						/>
					</div>
				</div>
				<RegularTextMont>{user?.name}</RegularTextMont>
				<SmallGrayText className="!text-xs">
					{user?.username as string}
				</SmallGrayText>
				<SmallGrayText className="!text-xs">
					{("Sharecode: " + user?.shareCode) as string}
				</SmallGrayText>
			</div>
			<div className="pt-2 sm:max-w-max  flex flex-col sm:flex-row flex-1 items-end sm:justify-end gap-2">
				<AdminActionButton
					className="w-full sm:w-max sm:min-w-max"
					text="Toggle status"
					type="button"
					color="green"
					onClick={() =>
						setShowModal({
							isActive: true,
							modalContent: user,
							modalType: "status",
						})
					}
				/>
				<AdminActionButton
					className="w-full sm:w-max sm:min-w-max"
					text="Toggle admin"
					type="button"
					color="blue"
					onClick={() =>
						setShowModal({
							isActive: true,
							modalContent: user,
							modalType: "admin",
						})
					}
				/>
				<AdminActionButton
					className="w-full sm:w-max sm:min-w-max"
					text="Delete"
					type="button"
					color="red"
					onClick={() =>
						setShowModal({
							isActive: true,
							modalContent: user,
							modalType: "delete",
						})
					}
				/>
			</div>
		</div>
	);
};

const UserAdminCards = () => {
	const { user } = useAuthContext();
	const queryClient = useQueryClient();
	const [showModal, setShowModal] = useState<{
		isActive: boolean;
		modalContent: MongoUser;
		modalType: "admin" | "delete" | "status" | null;
	}>({ isActive: false, modalContent: null, modalType: null });
	const [modalLoading, setModalLoading] = useState<boolean>(false);
	const [modalError, setModalError] = useState<string>("");
	const { data, isLoading, isError, error } = useQuery(
		["admin", "users"],
		() => getUsers(user),
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
					<AdminUserModalContent
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</ModalWrapper>
			) : null}
			<>
				<div className="py-4 sticky top-0 left-0 w-full bg-[#fffdf3] border-b-2 border-gray-400">
					<RegularTextMont>Total Users: {data?.length}</RegularTextMont>
				</div>
				{data?.map((user: MongoUser) => (
					<UserAdminCard
						key={user?._id}
						user={user}
						setShowModal={setShowModal}
					/>
				))}
			</>
		</>
	);
};

export default UserAdminCards;
