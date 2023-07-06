import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User, EmailAuthProvider } from "firebase/auth";

import {
	updateEmail,
	reauthenticateWithCredential,
	updatePassword,
} from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import { useAuthContext } from "context";
import ErrorText from "../Text/ErrorText";

const ChangePasswordForm = () => {
	const router = useRouter();
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

	const changePassword = async () => {
		setRequestLoading(true);
		try {
			await updatePassword(user as User, formValues.password as string);
			router.push("/profile");
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
			changePassword();
		}
	};

	useEffect(() => {
		setFormErrors({});
		setRequestError(null);
	}, [formValues]);

	return (
		<div className="h-full w-full grid place-content-center ">
			<form
				className="max-w-md"
				onSubmit={(event) => handleSubmit(event)}
				noValidate
			>
				<TitleText text="Change password" />
				<SmallGrayText>
					{`Please enter your new password below (must include at least 6
					characters). An email will be sent to you in case you didn't make this
					change. Check spam folder if the email is not in your regular inboxes.`}
				</SmallGrayText>
				<div className="mt-2 border-2 border-gray-300 rounded-md overflow-hidden">
					<div className="flex flex-col items-center h-full w-full border-b-2 border-gray-300">
						<div className="flex items-center w-full ">
							<SmallGrayText className="px-2 min-w-max">Password</SmallGrayText>
							<input
								className="p-2 w-full bg-transparent border-gray-300"
								type="password"
								name="password"
								onChange={(event) =>
									setFormValues({ ...formValues, password: event.target.value })
								}
							/>
						</div>
						{formErrors.password ? (
							<ErrorText
								className="py-1 px-2 w-full "
								text={formErrors.password}
							/>
						) : null}
					</div>
					<div className="flex flex-col items-center h-full w-full border-b-2 border-gray-300">
						<div className="flex items-center w-full ">
							<SmallGrayText className="px-2 min-w-max">Confirm</SmallGrayText>
							<input
								className="p-2 w-full bg-transparent border-gray-300"
								type="password"
								name="confirmPassword"
								onChange={(event) =>
									setFormValues({
										...formValues,
										confirmPassword: event.target.value,
									})
								}
							/>
						</div>
						{formErrors.confirmPassword ? (
							<ErrorText
								className="py-1 px-2 w-full"
								text={formErrors.confirmPassword}
							/>
						) : null}
					</div>
					<div className="p-2">
						{requestError ? (
							<ErrorText
								className="pb-1 text-center w-full "
								text="Something went wrong"
							/>
						) : null}
						<button
							className="w-full text-blue-500 font-kumbh hover:text-blue-600 transition-colors ease-in-out duration-200 disabled:text-gray-500"
							type="submit"
							disabled={
								formValues.password === "" ||
								formValues.confirmPassword === "" ||
								requestLoading
									? true
									: false
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
					</div>
				</div>
			</form>
		</div>
	);
};

export default ChangePasswordForm;
