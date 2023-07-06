import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updateEmail, signOut, applyActionCode } from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";
import SmallGrayText from "../Text/SmallGrayText";
import TitleText from "../Text/TitleText";
import { useAuthContext } from "context";
import { updateUserEmail } from "utils";
import { AxiosError } from "axios";
import PillButton from "../Buttons/PillButton";
import TextLink from "../Links/TextLink";
import ErrorText from "../Text/ErrorText";

type Props = {};

const RecoverEmailForm = (props: Props) => {
	const router = useRouter();
	const { oobCode } = router.query;
	const { user } = useAuthContext();
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [requestError, setRequestError] = useState<string | null>(null);

	const recoverEmail = async () => {
		setRequestError(null);
		setRequestLoading(true);
		try {
			await auth.currentUser?.reload();
			await applyActionCode(auth, oobCode as string);
			await signOut(auth);
			router.push("/");
		} catch (error: unknown) {
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		recoverEmail();
	};

	return (
		<div className="h-full w-full grid place-content-center ">
			<form
				className="max-w-xs"
				onSubmit={(event) => handleSubmit(event)}
				noValidate
			>
				<TitleText text="Recover Email" />
				<SmallGrayText>
					If your account email has been changed without your consent, please
					click the button below. This action will revert your account email to
					the one used before the change.
				</SmallGrayText>
				{requestError ? (
					<ErrorText className="pt-1 w-full text-center" text={requestError} />
				) : null}
				<div
					className={`pt-2 flex justify-center ${
						requestLoading ? "animate-pulse" : ""
					}`}
				>
					<PillButton type="submit" variant="main" text="Recover" />
				</div>

				<SmallGrayText className="pt-1">
					If this change was intentional please return to the{" "}
					<TextLink link="/home">home</TextLink> page
				</SmallGrayText>
			</form>
		</div>
	);
};

export default RecoverEmailForm;
