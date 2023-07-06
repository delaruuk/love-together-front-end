import React, { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "firebase-config/firebaseConfig";
import { createUser, getLegalDocs, getUserData } from "utils";

import PillButton from "../Buttons/PillButton";
import ImageButton from "../Buttons/ImageButton";
import SmallGrayText from "../Text/SmallGrayText";
import TitleTextUnderline from "../Text/TitleTextUnderline";
import SingleStepTextInput from "../InputFields/SingleStepTextInput";
import ErrorText from "../Text/ErrorText";
import TextLink from "../Links/TextLink";

const googleImage = require("assets/google.svg");

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "90%",
		height: "90%",
	},
};

type AuthFormProps = {
	authMethod: "sign-in" | "sign-up";
	titleText: string;
	buttonText: string;
	optionsText: string;
};

const AuthForm = ({
	authMethod,
	titleText,
	buttonText,
	optionsText,
}: AuthFormProps) => {
	const router = useRouter();
	const [formValues, setFormValues] = useState<{ [key: string]: string }>(
		authMethod === "sign-in"
			? {
					email: "",
					password: "",
			  }
			: {
					email: "",
					password: "",
					confirmPassword: "",
			  }
	);
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [firebaseError, setFirebaseError] = useState<string>("");
	const [doc, setDoc] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);

	async function openModal(e: MouseEvent) {
		const target = e.target as HTMLButtonElement;
		let docData = await getLegalDocs(target.name);
		setDoc(docData.fileUrl);
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const emailAuth = async () => {
		switch (authMethod) {
			case "sign-up":
				setRequestLoading(true);
				try {
					const user = await createUserWithEmailAndPassword(
						auth,
						formValues.email,
						formValues.password
					);
					router.push("/sign-up/questions");
				} catch (error: unknown) {
					if (error instanceof Error) {
						setFirebaseError(error.message);
					}
				}
				setRequestLoading(false);
				break;
			case "sign-in":
				setRequestLoading(false);
				try {
					await signInWithEmailAndPassword(
						auth,
						formValues.email,
						formValues.password
					);
					router.push("/home");
				} catch (error: unknown) {
					if (error instanceof Error) {
						setFirebaseError(error.message);
					}
				}
				setRequestLoading(false);
				break;
			default:
				break;
		}
	};

	const googleAuth = async () => {
		try {
			const googleUser = await signInWithPopup(auth, googleProvider);
			switch (authMethod) {
				case "sign-in":
					router.push("/home");
					break;
				case "sign-up":
					router.push("/sign-up/questions");
					break;
				default:
					break;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setFirebaseError(error.message);
			}
		}
	};

	const validate = () => {
		const errors: { [key: string]: string } = {};
		if (
			!formValues.email ||
			formValues.email.includes(" ") ||
			!formValues.email.includes("@")
		) {
			errors.email = "Please input a valid email";
		}
		if (
			!formValues.password ||
			formValues.password.includes(" ") ||
			formValues.password.length < 6
		) {
			errors.password = "Please input a valid password";
		}
		if (
			authMethod === "sign-up" &&
			formValues.confirmPassword !== formValues.password
		) {
			errors.confirmPassword = "Make sure your passwords match";
		}
		return errors;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validate();
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			emailAuth();
		}
	};

	return (
		<div className="h-full w-full grid place-items-center">
			<form
				className="max-w-xs w-full flex flex-col"
				onSubmit={(event) => handleSubmit(event)}
				noValidate
			>
				<TitleTextUnderline className="pb-2" text={titleText} />
				{authMethod === "sign-in" ? (
					<SmallGrayText>
						or <TextLink link="/sign-up">create account</TextLink>
					</SmallGrayText>
				) : (
					<SmallGrayText>
						or <TextLink link="/sign-in">sign in</TextLink>
					</SmallGrayText>
				)}
				
				<SmallGrayText>
					{`Please stay consistent with login method. If you created your account
					by typing your email, don't use the google button and vice versa.`}
				</SmallGrayText>
				<div className="pt-8 flex flex-col [&>div]:mb-4 last-of-type:[&>div]:mb-0">
					<div>
						<SingleStepTextInput
							type="email"
							name="email"
							placeholder="Email"
							isError={formErrors.email ? true : false}
							formValues={formValues}
							setFormValues={setFormValues}
						/>
						{formErrors.email ? (
							<ErrorText className="pt-1" text={formErrors.email} />
						) : null}
					</div>
					<div>
						<SingleStepTextInput
							type="password"
							name="password"
							placeholder="Password"
							isError={formErrors.password ? true : false}
							formValues={formValues}
							setFormValues={setFormValues}
						/>
						{formErrors.password ? (
							<ErrorText className="pt-1" text={formErrors.password} />
						) : null}
					</div>
					{authMethod === "sign-up" ? (
						<div>
							<SingleStepTextInput
								type="password"
								name="confirmPassword"
								placeholder="Confirm Password"
								isError={formErrors.confirmPassword ? true : false}
								formValues={formValues}
								setFormValues={setFormValues}
							/>
						</div>
					) : null}
				</div>
				{authMethod === "sign-up" ? (
					<SmallGrayText className="pt-1">
						Passwords must include 6 characters and have no spaces
					</SmallGrayText>
				) : null}
				{authMethod === "sign-in" ? (
					<SmallGrayText className="mt-2">
						<TextLink link="/recover">Forgot Password?</TextLink>
					</SmallGrayText>
				) : null}
				<div className="pt-8 pb-2 flex flex-row items-center justify-center mb-5">
					{firebaseError ? (
						<ErrorText className="pb-1" text={firebaseError} />
					) : null}
					<div className={`w-full ${requestLoading ? "animate-pulse" : ""}`}>
						<PillButton text={buttonText} type="submit" variant="main" />
					</div>
					<div className="pt-2 flex items-center justify-center [&>button]:ml-4">
						<SmallGrayText className= "ml-5">{optionsText}</SmallGrayText>
						<ImageButton
							src={googleImage}
							alt="google"
							onClick={() => googleAuth()}
						/>
					</div>
				</div>
				<p className=" text-center text-sm">
					By continuing, you agree to our{" "}
					<button
						className="text-blue-500"
						type="button"
						onClick={(e) => openModal(e)}
						name="Terms and Conditions"
					>
						Terms
					</button>{" "}
					and{" "}
					<button
						className="text-blue-500"
						type="button"
						onClick={(e) => openModal(e)}
						name="Privacy Policy"
					>
						Privacy Policies.
					</button>
				</p>
			</form>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				ariaHideApp={false}
			>
				<button onClick={closeModal}>Close</button>
				<object data={doc} style={{ height: "95%", width: "100%" }}></object>
			</Modal>
		</div>
	);
};

export default AuthForm;
