import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "context";
import Link from "next/link";
import StripeButton from "../Buttons/StripeButton";
import SmallGrayText from "../Text/SmallGrayText";
import { putUser, validateShareCode } from "utils";
import RegularTextMont from "../Text/RegularTextMont";
import ErrorText from "../Text/ErrorText";
import Image from "next/image";

const pencilImage = require("assets/pencil.svg");

const ProfileForm = () => {
	const { user, userInfo, setUserInfo } = useAuthContext();
	const [formValues, setFormValues] = useState<{
		name: string;
		shareCode: string;
		birthDate: string;
	}>({
		name: userInfo?.name as string,
		shareCode: userInfo?.shareCode as string,
		birthDate: userInfo?.dateOfBirth.slice(0, 10) as string,
	});
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	const [codeError, setCodeError] = useState<string | null>(null);
	const [codeValidated, setCodeValidated] = useState<boolean>(false);
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [requestError, setRequestError] = useState<string>();

	const editUser = async () => {
		setRequestLoading(true);
		try {
			const updatedUser = await putUser(user, formValues);
			setUserInfo(updatedUser);
			setCodeError(null);
			setCodeValidated(false);
		} catch (error) {
			if (error instanceof AxiosError) {
				setRequestError(
					error.response?.data.errorMessage
						? error.response.data.errorMessage
						: error
				);
			}
		}
		setRequestLoading(false);
	};

	const validateCode = async () => {
		try {
			const isValidated = await validateShareCode(user, formValues.shareCode);
			setCodeValidated(isValidated.status);
		} catch (error: unknown) {
			setCodeValidated(false);
			if (error instanceof AxiosError) {
				setCodeError(
					error.response?.data.message
						? error.response.data.message
						: error.message
				);
			}
		}
	};

	const validate = () => {
		const errors: { [key: string]: string } = {};

		const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		const numbers = /[0-9]/;
		const capitals = /[A-Z]/;

		if (!formValues.name) {
			errors.name = "Please input a valid name";
		}
		if (
			!formValues.shareCode ||
			formValues.shareCode.includes(" ") ||
			!specialChars.test(formValues.shareCode) ||
			!numbers.test(formValues.shareCode) ||
			!capitals.test(formValues.shareCode) ||
			(codeValidated === false && formValues.shareCode !== userInfo?.shareCode)
		) {
			errors.shareCode =
				"Please remember a share code must have a capital letter, special character, and a number. You must also validate the code before submitting.";
		}
		if (!formValues.birthDate || formValues.birthDate === "") {
			errors.birthDate = "Please input a valid birth date";
		}
		return errors;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validate();
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			editUser();
		}
	};

	useEffect(() => {
		setFormErrors({});
	}, [formValues]);

	useEffect(() => {
		setCodeError(null);
		setCodeValidated(false);
	}, [formValues.shareCode]);

	useEffect(() => {
		setCodeValidated(false);
	}, [codeError]);

	return (
		<form
			className="border-2 border-gray-300 rounded-md overflow-hidden"
			onSubmit={(event) => handleSubmit(event)}
			noValidate
		>
			<div className="p-2 bg-gray-300">
				<RegularTextMont className="!text-gray-500">
					Profile details
				</RegularTextMont>
			</div>
			<div className=" flex flex-col [&>input]:font-kumbh">
				<div className="flex flex-col items-center h-full w-full border-b-2 border-gray-300">
					<div className="flex items-center w-full ">
						<SmallGrayText className="px-2">Name</SmallGrayText>
						<div className="flex relative w-full">
							<input
								className="p-2 h-full w-full bg-transparent font-mont font-medium"
								type="text"
								name="name"
								defaultValue={userInfo?.name}
								onChange={(event) =>
									setFormValues({
										...formValues,
										name: event.target.value as string,
									})
								}
							/>
							<Image
								className="absolute top-0 right-0 h-full mr-2"
								priority
								src={pencilImage}
								alt="loading"
								width={20}
								height={20}
							/>
						</div>
					</div>
					{formErrors.name ? (
						<ErrorText className="py-1 px-2 w-full" text={formErrors.name} />
					) : null}
				</div>
				<div className="flex flex-col items-center h-full w-full border-b-2 border-gray-300">
					<div className="flex items-center w-full ">
						<SmallGrayText className="px-2 min-w-max">Birth Date</SmallGrayText>
						<div className="flex relative w-full">
							<input
								className="p-2 bg-transparent border-gray-300 font-mont font-medium"
								type="date"
								name="birthDate"
								defaultValue={userInfo?.dateOfBirth.slice(0, 10)}
								onChange={(event) =>
									setFormValues({
										...formValues,
										birthDate: event.target.value as string,
									})
								}
							/>
							<Image
								className="absolute top-0 right-0 h-full mr-2"
								priority
								src={pencilImage}
								alt="loading"
								width={20}
								height={20}
							/>
						</div>
					</div>
					{formErrors.birthDate ? (
						<ErrorText
							className="py-1 px-2 w-full"
							text={formErrors.birthDate}
						/>
					) : null}
				</div>
				<div className="flex flex-col items-center h-full w-full border-b-2 border-gray-300">
					<div className="flex items-center w-full">
						<SmallGrayText className="px-2 min-w-max">Share Code</SmallGrayText>
						<div className="flex relative w-full">
							<input
								className="p-2 w-full bg-transparent border-gray-300 font-mont font-medium"
								type="text"
								name="shareCode"
								defaultValue={userInfo?.shareCode}
								onChange={(event) =>
									setFormValues({
										...formValues,
										shareCode: event.target.value as string,
									})
								}
							/>
							<Image
								className="absolute top-0 right-0 h-full mr-2"
								priority
								src={pencilImage}
								alt="loading"
								width={20}
								height={20}
							/>
						</div>
					</div>
					<div className="p-2 w-full flex items-start font-kumbh">
						{codeError ? (
							<button
								type="button"
								className="text-white bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer disabled:cursor-default"
								onClick={() => validateCode()}
							>
								{codeError}
							</button>
						) : (
							<button
								type="button"
								disabled={
									codeValidated || formValues.shareCode === userInfo?.shareCode
										? true
										: false
								}
								className={`text-white ${
									codeValidated
										? "bg-green-600"
										: "bg-blue-600 hover:bg-blue-800"
								} font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer disabled:cursor-default`}
								onClick={() => validateCode()}
							>
								{codeValidated ? "Code Available" : "Validate Code"}
							</button>
						)}
					</div>

					{formErrors.shareCode ? (
						<ErrorText
							className="py-1 px-2 w-full"
							text={formErrors.shareCode}
						/>
					) : null}
				</div>
				<button
					className="p-2 w-full text-blue-500 font-kumbh hover:text-blue-600  border-b-2 border-gray-300 transition-colors ease-in-out duration-200 disabled:text-gray-500"
					type="submit"
					disabled={
						(userInfo?.name === formValues.name &&
						userInfo?.dateOfBirth.slice(0, 10) === formValues.birthDate &&
						userInfo.shareCode === formValues.shareCode
							? true
							: false) || requestLoading
					}
				>
					{requestLoading ? (
						<div className="pt-4 flex items-end justify-center">
							<span className="p-1 bg-blue-500 animate-loader rounded-full"></span>
							<span className="mx-2 p-1  bg-blue-500 animate-loader animation-delay-200 rounded-full"></span>
							<span className="p-1 bg-blue-500 animate-loader animation-delay-400 rounded-full "></span>
						</div>
					) : (
						"Submit"
					)}
				</button>
				<div className="font-kumbh flex flex-col">
					<Link
						className="p-2 w-full text-center text-blue-500 hover:text-blue-600 border-b-2 border-gray-300 transition-colors ease-in-out duration-200"
						href={"/profile/change-email"}
					>
						Change Email
					</Link>
					<Link
						className="p-2 w-full text-center text-blue-500 hover:text-blue-600 transition-colors ease-in-out duration-200"
						href={"/profile/change-password"}
					>
						Change Password
					</Link>
					{requestError ? (
						<p className="p-2 text-sm text-red-500 border-t-2 border-gray-300">
							{requestError}
						</p>
					) : (
						<></>
					)}
				</div>
			</div>
		</form>
	);
};

export default ProfileForm;
