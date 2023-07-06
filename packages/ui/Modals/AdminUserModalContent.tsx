import { MongoUser } from "models";
import { AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { removeUser, toggleAdmin, toggleStatus } from "utils";
import AdminActionButton from "../Buttons/AdminActionButton";
import SmallGrayText from "../Text/SmallGrayText";
import { useState } from "react";
import { useAuthContext } from "context";
import ModalLoading from "../Loading/ModalLoading";

type AdminUserModalContentProps = {
	showModal: {
		isActive: boolean;
		modalContent: MongoUser | null;
		modalType: "admin" | "delete" | "status" | null;
	};
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: MongoUser | null;
			modalType: "admin" | "delete" | "status" | null;
		}>
	>;
};

const AdminUserModalContent = ({
	showModal,
	setShowModal,
}: AdminUserModalContentProps) => {
	const queryClient = useQueryClient();
	const { user } = useAuthContext();
	const [userRequestLoading, setUserRequestLoading] = useState<boolean>(false);
	const [userRequestError, setUserRequestError] = useState<string>("");

	const adminUser = async () => {
		setUserRequestLoading(true);
		try {
			await toggleAdmin(user, showModal.modalContent);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "users"],
				refetchInactive: true,
			});
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				setUserRequestError(
					error?.response?.data.errorMessage
						? error?.response?.data.errorMessage
						: error.message
				);
			}
		}
		setUserRequestLoading(false);
	};

	const deleteUser = async () => {
		setUserRequestLoading(true);
		try {
			await removeUser(user, showModal.modalContent);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "users"],
				refetchInactive: true,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				setUserRequestError(
					error?.response?.data.errorMessage
						? error?.response?.data.errorMessage
						: error.message
				);
			}
		}
		setUserRequestLoading(false);
	};

	const togglePremium = async () => {
		setUserRequestLoading(true);
		try {
			await toggleStatus(user, showModal.modalContent);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "users"],
				refetchInactive: true,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				setUserRequestError(
					error?.response?.data.errorMessage
						? error?.response?.data.errorMessage
						: error.message
				);
			}
		}
		setUserRequestLoading(false);
	};

	if (showModal.modalType === "admin") {
		return (
			<>
				{userRequestLoading ? <ModalLoading /> : null}
				<h1 className="text-blue-500 text-lg font-medium">
					{showModal.modalContent?.isAdmin ? "Remove admin" : "Make user admin"}
				</h1>
				<SmallGrayText>
					{showModal.modalContent?.isAdmin
						? "Are you sure you want to remove this user as admin? They will no longer be able to make changes and cannot use the admin endpoints anymore."
						: `Are you sure you would like to make this user an admin? This user will be able to change other users, survey questions, user questions, survey categories, and admin info.`}
				</SmallGrayText>
				<p>{showModal.modalContent?.name}</p>
				<div className="pt-1 flex flex-col sm:flex-row gap-4 ">
					<AdminActionButton
						className="sm:w-1/2"
						text="Cancel"
						type="button"
						color="red"
						onClick={() => setShowModal({ ...showModal, isActive: false })}
					/>
					<AdminActionButton
						className="sm:w-1/2"
						text="Confirm"
						type="button"
						color="green"
						onClick={() => adminUser()}
					/>
				</div>
				{userRequestError ? (
					<p className="pt-1 text-sm text-red-500">{userRequestError}</p>
				) : null}
			</>
		);
	}

	if (showModal.modalType === "delete") {
		return (
			<>
				{userRequestLoading ? <ModalLoading /> : null}
				<h1 className="text-red-500 text-lg font-medium">Delete user</h1>
				<SmallGrayText>
					Are you sure you want to delete this account? All of their data will
					be permanently removed. This action cannot be undone.
				</SmallGrayText>
				<p className="pr-2">{showModal.modalContent?.name}</p>
				<div className="pt-1 flex flex-col sm:flex-row gap-4 ">
					<AdminActionButton
						className="sm:w-1/2 "
						text="Cancel"
						type="button"
						color="red"
						onClick={() => setShowModal({ ...showModal, isActive: false })}
					/>
					<AdminActionButton
						className="sm:w-1/2 "
						text="Confirm"
						type="button"
						color="green"
						onClick={() => deleteUser()}
					/>
				</div>
				{userRequestError ? (
					<p className="pt-1 text-sm text-red-500">{userRequestError}</p>
				) : null}
			</>
		);
	}

	if (showModal.modalType === "status") {
		return (
			<>
				{userRequestLoading ? <ModalLoading /> : null}
				<h1 className="text-green-500 text-lg font-medium">
					{showModal.modalContent?.subscriptionStatus === "Premium"
						? "Remove User Premium"
						: "Give User Premium"}
				</h1>
				<SmallGrayText>
					{showModal.modalContent?.subscriptionStatus === "Premium"
						? "Are you sure you want to remove this user's Premium status? They will no longer have access to all premium features."
						: `Are you sure you would like to give this user Premium status? They will have access to all premium features.`}
				</SmallGrayText>
				<p className="pr-2">{showModal.modalContent?.name}</p>
				<div className="pt-1 flex flex-col sm:flex-row gap-4 ">
					<AdminActionButton
						className="sm:w-1/2 "
						text="Cancel"
						type="button"
						color="red"
						onClick={() => setShowModal({ ...showModal, isActive: false })}
					/>
					<AdminActionButton
						className="sm:w-1/2 "
						text="Confirm"
						type="button"
						color="green"
						onClick={() => togglePremium()}
					/>
				</div>
				{userRequestError ? (
					<p className="pt-1 text-sm text-red-500">{userRequestError}</p>
				) : null}
			</>
		);
	}
	return <></>;
};

export default AdminUserModalContent;
