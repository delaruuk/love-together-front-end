import { useEffect, useState } from "react";
import { User, EmailAuthProvider } from "firebase/auth";

import { updateEmail, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import { useAuthContext } from "context";
import ErrorText from "../Text/ErrorText";

type RevalidateFormProps = {
	setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const RevalidateForm = ({ setIsValidated }: RevalidateFormProps) => {
	const { user } = useAuthContext();
	const [password, setPassword] = useState<string>();
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [requestError, setRequestError] = useState<string | null>();

	const revalidateUser = async () => {
		setRequestLoading(true);
		try {
			const credential = EmailAuthProvider.credential(
				user?.email as string,
				password as string
			);
			await reauthenticateWithCredential(user as User, credential);
			setIsValidated(true);
		} catch (error) {
			if (error instanceof Error) {
				setRequestError(error.message);
			}
		}
		setRequestLoading(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		revalidateUser();
	};

	useEffect(() => {
		setRequestError(null);
	}, [password]);

	if (user?.providerData[0].providerId !== "password") {
		return (
			<div className="h-full w-full grid place-content-center ">
				<p className="text-center">
					Users who have created their account with a third party authentication
					provider cannot change their email or password.
				</p>
			</div>
		);
	}

	return (
		<div className="h-full w-full grid place-content-center ">
			<form
				className="max-w-md"
				onSubmit={(event) => handleSubmit(event)}
				noValidate
			>
				<TitleText text="Revalidate" />
				<SmallGrayText>
					Please enter your password below to revalidate your account. After
					your account is validated you can change your email/password.
				</SmallGrayText>
				<div className="mt-2 border-2 border-gray-300 rounded-md overflow-hidden">
					<div className="flex flex-col items-center h-full w-full border-b-2 border-gray-300">
						<div className="flex items-center w-full ">
							<SmallGrayText className="px-2 min-w-max">Password</SmallGrayText>
							<input
								className="p-2 w-full bg-transparent border-gray-300"
								type="password"
								name="password"
								onChange={(event) => setPassword(event.target.value as string)}
							/>
						</div>
						{requestError ? (
							<ErrorText
								className="py-1 px-2 w-full "
								text="Incorrect password"
							/>
						) : null}
					</div>
					<button
						className="p-2 w-full text-blue-500 font-kumbh hover:text-blue-600 transition-colors ease-in-out duration-200 disabled:text-gray-500"
						type="submit"
						disabled={password !== "" || requestLoading ? false : true}
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
			</form>
		</div>
	);
};

export default RevalidateForm;
