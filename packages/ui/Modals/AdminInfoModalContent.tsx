import { useAuthContext } from "context";
import { AdminInfo } from "models";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { editAdminInfo, postAdminInfo } from "utils";
import AdminActionButton from "../Buttons/AdminActionButton";
import SelectInput from "../InputFields/SelectInput";
import SingleStepTextInput from "../InputFields/SingleStepTextInput";
import TextLink from "../Links/TextLink";
import ErrorText from "../Text/ErrorText";
import RegularTextMont from "../Text/RegularTextMont";
import SmallGrayText from "../Text/SmallGrayText";
import { AxiosError } from "axios";

type AdminInfoModalContentProps = {
	showModal: {
		isActive: boolean;
		modalContent: AdminInfo | null;
		modalType: "add" | "delete" | "edit" | null;
	};
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: AdminInfo | null;
			modalType: "add" | "delete" | "edit" | null;
		}>
	>;
};

const AdminInfoModalContent = ({
	showModal,
	setShowModal,
}: AdminInfoModalContentProps) => {
	const queryClient = useQueryClient();
	const { user } = useAuthContext();
	const [formValues, setFormValues] = useState<{
		[key: string]: any;
	}>(
		showModal.modalContent
			? {
					adminInfoType: showModal.modalContent.fileUrl ? "file" : "text",
					name: showModal.modalContent.name,
					description: showModal.modalContent.description,
					filePreview: showModal.modalContent.fileUrl
						? showModal.modalContent.fileUrl
						: null,
					file: null,
					value: showModal.modalContent.value
						? showModal.modalContent.value
						: null,
			  }
			: {
					adminInfoType: "text",
					name: "",
					description: "",
					file: null,
					value: null,
			  }
	);
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	const [userRequestLoading, setUserRequestLoading] = useState<boolean>(false);
	const [userRequestError, setUserRequestError] = useState<string | null>("");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFormValues({ ...formValues, file: event.target.files[0] });
		}
	};

	const addInfo = async () => {
		setUserRequestLoading(true);
		try {
			await postAdminInfo(user, formValues);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "info"],
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
	const editInfo = async () => {
		setUserRequestLoading(true);
		try {
			await editAdminInfo(user, formValues);
			setShowModal({ isActive: false, modalContent: null, modalType: null });
			queryClient.invalidateQueries({
				queryKey: ["admin", "info"],
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
	const deleteInfo = () => {
		console.log("Info deleted");
	};

	const validate = () => {
		const errors: { [key: string]: string } = {};
		if (formValues.name === "" || formValues.name === " ") {
			errors.name = "Please input a valid name";
		}
		if (
			formValues.adminInfoType === "text" &&
			(formValues.value === null ||
				formValues.value === "" ||
				formValues.value === " ")
		) {
			errors.value = "Please input a valid value";
		}
		if (
			formValues.adminInfoType === "file" &&
			formValues.filePreview === undefined &&
			formValues.file === null
		) {
			errors.file = "Please input a file";
		}
		return errors;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validate();
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			switch (showModal.modalType) {
				case "add":
					addInfo();
					break;
				case "edit":
					editInfo();
					break;
				case "delete":
					deleteInfo();
					break;
				default:
					break;
			}
		}
	};

	useEffect(() => {
		if (showModal.modalType === "add") {
			setFormValues({ ...formValues, file: null, value: null });
		}
		setFormErrors({});
		setUserRequestError(null);
	}, [formValues.adminInfoType]);

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	if (showModal.modalType === "add" || showModal.modalType === "edit") {
		return (
			<>
				<h1 className="text-blue-500 text-lg font-medium">
					{showModal.modalType === "add" ? "Add admin info" : "Edit admin info"}
				</h1>
				<form onSubmit={(event) => handleSubmit(event)} noValidate>
					{showModal.modalType === "add" ? (
						<div className="flex gap-2 items-center justify-between">
							<label htmlFor="adminInfoType">
								<SmallGrayText>Info type:</SmallGrayText>
							</label>
							<SelectInput
								name="adminInfoType"
								selections={[
									{ value: "file", selection: "File" },
									{ value: "text", selection: "Text" },
								]}
								formValues={formValues}
								setFormValues={setFormValues}
								currentAnswers={formValues.adminInfoType}
							/>
						</div>
					) : null}
					{showModal.modalType === "add" ? (
						<div className="pt-2">
							<label htmlFor="name">
								<SmallGrayText>Name</SmallGrayText>
							</label>
							<SingleStepTextInput
								type="text"
								name="name"
								placeholder="Name..."
								defaultValue={formValues.name}
								isError={formErrors.name ? true : false}
								formValues={formValues}
								setFormValues={setFormValues}
							/>
							{formErrors.name ? (
								<ErrorText className="pt-1" text={formErrors.name} />
							) : null}
						</div>
					) : (
						<SmallGrayText className="pr-2">
							Name - {showModal.modalContent?.name}
						</SmallGrayText>
					)}
					<div className="pt-2">
						<label htmlFor="description">
							<SmallGrayText>Description</SmallGrayText>
						</label>
						<SingleStepTextInput
							type="text"
							name="description"
							placeholder="Description..."
							defaultValue={formValues.description}
							isError={formErrors.description ? true : false}
							formValues={formValues}
							setFormValues={setFormValues}
						/>
					</div>
					{formValues.adminInfoType === "text" ? (
						<div className="pt-2">
							<label htmlFor="value">
								<SmallGrayText>Value</SmallGrayText>
							</label>
							<SingleStepTextInput
								type="text"
								name="value"
								placeholder="Value..."
								defaultValue={formValues.value}
								isError={formErrors.value ? true : false}
								formValues={formValues}
								setFormValues={setFormValues}
							/>
							{formErrors.value ? (
								<ErrorText className="pt-1" text={formErrors.value} />
							) : null}
						</div>
					) : (
						<div className="pt-2">
							<SmallGrayText>
								Chosen file{" "}
								{formValues.file ? "- " + formValues.file.name : "- none"}
							</SmallGrayText>
							{formValues.filePreview ? (
								<SmallGrayText>
									Current file -{" "}
									<TextLink
										className="break-all"
										target="_blank"
										link={showModal.modalContent?.fileUrl as string}
									>
										{showModal.modalContent?.fileUrl}
									</TextLink>
								</SmallGrayText>
							) : null}
							<label className="p-2 mt-2 inline-block w-full cursor-pointer text-center text-sm font-kumbh font-semibold text-white rounded-md bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 transition-colors ease-in-out duration-200">
								<input
									className="hidden"
									type="file"
									name="file"
									accept=".pdf"
									onChange={(event) => handleFileChange(event)}
								/>
								Change File
							</label>
							{formErrors.file ? (
								<ErrorText className="pt-1" text={formErrors.file} />
							) : null}
						</div>
					)}
					<div className="pt-4 flex flex-col sm:flex-row gap-4 ">
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
					{userRequestError ? (
						<ErrorText className="pt-1" text={userRequestError} />
					) : null}
				</form>
			</>
		);
	}

	return (
		<>
			<p>{showModal.modalType}</p>
		</>
	);
};

export default AdminInfoModalContent;
