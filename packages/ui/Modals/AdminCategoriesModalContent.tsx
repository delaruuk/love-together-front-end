import { useAuthContext } from "context";
import { Category } from "models";
import { useState } from "react";
import AdminActionButton from "../Buttons/AdminActionButton";
import SingleStepTextInput from "../InputFields/SingleStepTextInput";
import SmallGrayText from "../Text/SmallGrayText";

type AdminCategoriesProps = {
	categories: Category[];
	showModal: {
		isActive: boolean;
		modalContent: Category | null;
		modalType: "add" | "delete" | "edit" | null;
	};
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: Category | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
};

const AdminCategoriesModalContent = ({
	categories,
	showModal,
	setShowModal,
}: AdminCategoriesProps) => {
	const { user } = useAuthContext();
	const [formValues, setFormValues] = useState<{
		[key: string]: any;
	}>(
		showModal.modalContent
			? showModal.modalContent
			: {
					category: "",
					subscriptionStatus: "Free",
			  }
	);
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	const [firebaseError, setFirebaseError] = useState<string>("");

	return (
		<>
			{showModal.modalType === "add" || showModal.modalType === "edit" ? (
				<div>
					<h1 className="text-blue-500 text-lg font-medium">
						{showModal.modalType === "add" ? "Add category" : "Edit category"}
					</h1>
					<div className="flex flex-col sm:flex-row gap-4 ">
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
							type="submit"
							color="green"
						/>
					</div>
				</div>
			) : (
				<div>
					<h1 className="text-blue-500 text-lg font-medium">Delete category</h1>
					<div className="flex flex-col sm:flex-row gap-4 ">
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
							type="submit"
							color="green"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminCategoriesModalContent;
