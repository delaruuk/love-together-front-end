import { AxiosError } from "axios";
import { useAuthContext } from "context";
import { useQuery } from "react-query";
import { getAdminInfo, getUsers } from "utils";
import type { MongoUser, NextPageWithLayout, AdminInfo } from "models";
import AdminLayout from "ui/Layouts/AdminLayout";
import PageLoading from "ui/Loading/PageLoading";
import AdminActionButton from "../Buttons/AdminActionButton";
import SmallGrayText from "../Text/SmallGrayText";
import RegularTextMont from "../Text/RegularTextMont";
import TextLink from "../Links/TextLink";
import { useState } from "react";
import ModalWrapper from "../Modals/ModalWrapper";
import AdminInfoModalContent from "../Modals/AdminInfoModalContent";

interface AdminInfoCardProps {
	adminInfo: AdminInfo;
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: AdminInfo | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
}

const AdminInfoCard = ({ adminInfo, setShowModal }: AdminInfoCardProps) => {
	function formatFileSize(bytes: unknown, decimalPoint: number) {
		const bytesInNumber = bytes as number;
		if (bytes == 0) return "0 Bytes";
		var k = 1000,
			dm = decimalPoint || 2,
			sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
			i = Math.floor(Math.log(bytesInNumber) / Math.log(k));
		return (
			parseFloat((bytesInNumber / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
		);
	}

	if (adminInfo.filename) {
		return (
			<div className="py-2 flex flex-col items-start border-b-2 border-gray-400 bg-[#fffdf3] bg-opacity-70 overflow-hidden">
				<SmallGrayText>{adminInfo._id}</SmallGrayText>
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-2 ">
					<RegularTextMont className="min-w-max">
						{adminInfo.name}
					</RegularTextMont>
					<SmallGrayText className="!text-xs">
						{adminInfo.filename} | {formatFileSize(adminInfo.sizeInBytes, 3)}
					</SmallGrayText>
				</div>
				<SmallGrayText>{adminInfo.description}</SmallGrayText>
				<div className="w-full flex justify-between">
					<TextLink
						className="break-all"
						target="_blank"
						link={adminInfo.fileUrl as string}
					>
						{adminInfo.fileUrl}
					</TextLink>
					<div className="flex gap-2 items-end justify-end">
						<button
							onClick={() =>
								setShowModal({
									isActive: true,
									modalContent: adminInfo,
									modalType: "edit",
								})
							}
						>
							<SmallGrayText className="hover:!text-yellow-500 !transition-colors !ease-in-out !duration-200">
								Edit
							</SmallGrayText>
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="py-2 flex flex-col items-start border-b-2 border-gray-400 bg-[#fffdf3] bg-opacity-70">
			<SmallGrayText>{adminInfo._id}</SmallGrayText>
			<RegularTextMont>{adminInfo.name}</RegularTextMont>
			<SmallGrayText className="!text-sm">
				{adminInfo.description}
			</SmallGrayText>
			<div className="w-full flex justify-between">
				<RegularTextMont className="!text-sm">
					{adminInfo.value}
				</RegularTextMont>
				<div className="flex gap-2 items-end justify-end">
					<button
						onClick={() =>
							setShowModal({
								isActive: true,
								modalContent: adminInfo,
								modalType: "edit",
							})
						}
					>
						<SmallGrayText className="hover:!text-yellow-500 !transition-colors !ease-in-out !duration-200">
							Edit
						</SmallGrayText>
					</button>
				</div>
			</div>
		</div>
	);
};

const AdminInfoCards = () => {
	const { user } = useAuthContext();
	const [showModal, setShowModal] = useState<{
		isActive: boolean;
		modalContent: AdminInfo | null;
		modalType: "add" | "delete" | "edit" | null;
	}>({ isActive: false, modalContent: null, modalType: null });
	const { data, isLoading, isError, error } = useQuery(
		["admin", "info"],
		() => getAdminInfo(user),
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
					<AdminInfoModalContent
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</ModalWrapper>
			) : null}
			<div className="pt-4 sticky top-0 left-0 w-full bg-[#fffdf3] border-b-2 border-gray-400">
				<AdminActionButton
					className="h-min mb-4"
					text="Add"
					type="button"
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
			{data?.map((info: AdminInfo) => (
				<AdminInfoCard
					key={info._id}
					adminInfo={info}
					setShowModal={setShowModal}
				/>
			))}
		</>
	);
};

export default AdminInfoCards;
