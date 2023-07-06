import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User, EmailAuthProvider } from "firebase/auth";

import {
	updateEmail,
	reauthenticateWithCredential,
	updatePassword,
	applyActionCode,
	confirmPasswordReset,
} from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import { useAuthContext } from "context";
import PillButton from "../Buttons/PillButton";
import ErrorText from "../Text/ErrorText";

const ResetPasswordForm = () => {
	const router = useRouter();
	const { oobCode } = router.query;
	const { user } = useAuthContext();
	const [formValues, setFormValues] = useState<{
		password: string;
		confirmPassword: string;
	}>({ password: "", confirmPassword: "" });
	const [formErrors, setFormErrors] = useState<{
		[key: string]: string;
	}>({});
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [requestError, setRequestError] = useState<string | null>();

	const resetPassword = async () => {
		setRequestLoading(true);
		try {
			await confirmPasswordReset(auth, oobCode as string, formValues.password);
			if (user) {
				await reauthenticateWithCredential(
					user,
					EmailAuthProvider.credential(
						user.email as string,
						formValues.password
					)
				);
			}
			router.push("/sign-in");
			if (user) {
				await reauthenticateWithCredential(
					user,
					EmailAuthProvider.credential(
						user.email as string,
						formValues.password
					)
				);
			}
			router.push("/sign-in");
		} catch (error) {
			if (error instanceof Error) {
				setRequestError(error.message);
			}
		}
		setRequestLoading(false);
	};

	const validate = () => {
		const errors: { [key: string]: string } = {};
		if (
			!formValues.password ||
			formValues.password.includes(" ") ||
			formValues.password.length < 6
		) {
			errors.password = "Please input a valid password";
		}
		if (formValues.password !== formValues.confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}
		return errors;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validate();
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			resetPassword();
		}
	};

	useEffect(() => {
		setFormErrors({});
		setRequestError(null);
	}, [formValues]);

	return (
		<div className="h-full w-full grid place-content-center">
			<form
				className="max-w-xs"
				onSubmit={(event) => handleSubmit(event)}
				noValidate
			>
				<TitleText text="Reset password" />
				<SmallGrayText className="pb-4">
					Please enter your new password below (must include at least 6
					characters).
				</SmallGrayText>
				<input
					className={`mt-2 py-1 px-1 w-full outline-none bg-transparent border-b-2 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 placeholder:font-kumbh placeholder:font-medium  autofill:text-gray-500`}
					type="password"
					name="password"
					placeholder="Password"
					onChange={(event) =>
						setFormValues({ ...formValues, password: event.target.value })
					}
				/>
				{formErrors.password ? (
					<ErrorText className="pt-1 px-2 w-full" text={formErrors.password} />
				) : null}
				<input
					className={`mt-4 py-1 px-1 w-full outline-none bg-transparent border-b-2 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 placeholder:font-kumbh placeholder:font-medium text-gray-500 autofill:text-gray-500`}
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					onChange={(event) =>
						setFormValues({
							...formValues,
							confirmPassword: event.target.value,
						})
					}
				/>
				{formErrors.confirmPassword ? (
					<ErrorText
						className="pt-1 px-2 w-full"
						text={formErrors.confirmPassword}
					/>
				) : null}
				<div
					className={`pt-8 flex justify-center ${
						requestLoading ? "animate-pulse" : ""
					}`}
				>
					<PillButton type="submit" variant="main" text="Reset" />
				</div>
				{requestError ? (
					<ErrorText className="py-1 px-2 w-full " text={requestError} />
				) : null}
			</form>
		</div>
	);
};

export default ResetPasswordForm;
