import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	updateEmail,
	signOut,
	applyActionCode,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import { useAuthContext } from "context";
import { updateUserEmail } from "utils";
import { AxiosError } from "axios";
import PillButton from "../Buttons/PillButton";
import TextLink from "../Links/TextLink";
import ErrorText from "../Text/ErrorText";

const RecoverPasswordForm = () => {
	const router = useRouter();
	const { oobCode } = router.query;
	const { user } = useAuthContext();
	const [email, setEmail] = useState<string>(user?.email as string);
	const [emailError, setEmailError] = useState<string | null>();
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [requestError, setRequestError] = useState<string | null>(null);

	const resetPassword = async () => {
		setRequestLoading(true);
		try {
			await sendPasswordResetEmail(auth, email as string);
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
			resetPassword();
		}
	};

	useEffect(() => {
		setEmailError(null);
		setRequestError(null);
	}, [email]);

	return (
		<div className="h-full w-full grid place-content-center ">
			<form
				className="max-w-xs"
				onSubmit={(event) => handleSubmit(event)}
				noValidate
			>
				<TitleText text="Recover Password" />
				<SmallGrayText>
					If you cannot remember your password, please enter your email below.
					An email will be sent to this address with a link to reset your
					password.
				</SmallGrayText>
				<input
					className={`my-2 py-1 px-1 w-full outline-none bg-transparent border-b-2 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 font-kumbh font-medium text-gray-500 autofill:text-gray-500`}
					type="email"
					name="email"
					placeholder="example@email.com"
					onChange={(event) => setEmail(event.target.value as string)}
				/>
				{emailError ? (
					<ErrorText className="w-full" text={emailError as string} />
				) : null}
				<div
					className={`pt-2 flex justify-center ${
						requestLoading ? "animate-pulse" : ""
					}`}
				>
					<PillButton type="submit" variant="main" text="Reset" />
				</div>
				{requestError ? (
					<ErrorText
						className="pt-1 w-full text-center"
						text={requestError as string}
					/>
				) : null}
			</form>
		</div>
	);
};

export default RecoverPasswordForm;
