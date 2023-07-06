import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User, EmailAuthProvider } from "firebase/auth";

import {
	updateEmail,
	signOut,
	reauthenticateWithCredential,
	updatePassword,
} from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import { useAuthContext } from "context";
import { updateUserEmail } from "utils";
import { AxiosError } from "axios";
import ErrorText from "../Text/ErrorText";

type Props = {};

const ChangeEmailForm = (props: Props) => {
	const router = useRouter();
	const { user } = useAuthContext();
	const [email, setEmail] = useState<string>(user?.email as string);
	const [emailError, setEmailError] = useState<string | null>();
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [requestError, setRequestError] = useState<string | null>();

	const changeEmail = async () => {
		setRequestLoading(true);
		try {
			await updateEmail(user as User, email as string);
			await updateUserEmail(user, user?.email as string);
			await signOut(auth);
			router.push("/");
		} catch (error) {
			if (error instanceof AxiosError) {
				setRequestError(
					error.response?.data.errorMessage
						? error.response.data.errorMessage
						: error
				);
			} else if (error instanceof Error) {
				setRequestError(error.message);
			}
		}
		setRequestLoading(false);
	};

	const validate = () => {
		const errors: { [key: string]: string } = {};
		if (!email || email.includes(" ") || !email.includes("@")) {
			errors.email = "Please input a valid email";
		}
		return errors;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validate();
		setEmailError(errors.email);
		if (Object.keys(errors).length === 0) {
			changeEmail();
		}
	};

	useEffect(() => {
		setEmailError(null);
		setRequestError(null);
	}, [email]);

	return (
		<div className="h-full w-full grid place-content-center ">
			<form
				className="max-w-md"
				onSubmit={(event) => handleSubmit(event)}
				noValidate
			>
				<TitleText text="Change Email" />
				<SmallGrayText>
					{`Please enter your new email below. An email will be sent to your old
					email address in case you didn't make this change.`}
				</SmallGrayText>
				<div className="mt-2 border-2 border-gray-300 rounded-md overflow-hidden">
					<div className="flex flex-col items-center h-full w-full border-b-2 border-gray-300">
						<div className="flex items-center w-full ">
							<SmallGrayText className="px-2 min-w-max ">Email</SmallGrayText>
							<input
								className="p-2 w-full bg-transparent border-gray-300 font-mont font-medium"
								type="email"
								name="email"
								defaultValue={user?.email as string}
								onChange={(event) => setEmail(event.target.value as string)}
							/>
						</div>
						{emailError ? (
							<ErrorText className="py-1 px-2 w-full " text={emailError} />
						) : null}
					</div>
					<div className="p-2">
						{requestError ? (
							<ErrorText
								className="pb-1 w-full text-center"
								text="Something went wrong..."
							/>
						) : null}
						<button
							className="w-full text-blue-500 font-kumbh hover:text-blue-600 transition-colors ease-in-out duration-200 disabled:text-gray-500"
							type="submit"
							disabled={email === "" || requestLoading ? true : false}
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

export default ChangeEmailForm;
