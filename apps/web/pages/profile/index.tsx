import { deleteSelf, stripeVerify } from "utils";
import { useAuthContext } from "context";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

import { signOut } from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";

import { ReactElement, useEffect, useRef, useState } from "react";
import type { NextPageWithLayout } from "models";
import MainLayout from "ui/Layouts/MainLayout";
import ProfileForm from "ui/Forms/ProfileForm";

import SmallGrayText from "ui/Text/SmallGrayText";
import Image from "next/image";
import TitleText from "ui/Text/TitleText";
import Link from "next/link";
import TextLink from "ui/Links/TextLink";
import RegularTextMont from "ui/Text/RegularTextMont";
import ErrorText from "ui/Text/ErrorText";

const loadingImage = require("assets/logo.png");

const Index: NextPageWithLayout = () => {
	const router = useRouter();
	const { user, userInfo, setUserInfo } = useAuthContext();
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
	const [deleteError, setDeleteError] = useState<string | null>();

	const verifyStripeSession = async () => {
		try {
			const updatedInfo = await stripeVerify(
				user,
				router?.query?.session_id as string
			);
			console.log(updatedInfo);
			setUserInfo(updatedInfo.user);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				console.log(
					error.response?.data.errorMessage
						? error.response.data.errorMessage
						: error
				);
			}
		}
	};

	const logOut = async () => {
		await signOut(auth);
		router.push("/");
	};

	const deleteUserSelf = async () => {
		setDeleteLoading(true);
		try {
			await deleteSelf(user);
			router.push("/");
		} catch (error) {
			if (error instanceof AxiosError) {
				setDeleteError(
					error.response?.data.errorMessage
						? error.response.data.errorMessage
						: error
				);
			}
		}
		setDeleteLoading(false);
	};

	useEffect(() => {
		if (
			router.query.session_id &&
			router.query.session_id != "" &&
			router.query.session_id != " " &&
			user
		) {
			verifyStripeSession();
		}
	}, []);

	return (
		<div className="h-full grid place-items-center">
			<div className="max-w-md w-full">
				<TitleText className="pb-1" text={`Profile ${"- " + userInfo?.name}`} />
				<ProfileForm />
				<div className="mt-8 border-2 border-gray-300 rounded-md overflow-hidden">
					<div className="p-2 bg-gray-300">
						<RegularTextMont className="!text-gray-500">
							Consider donating
						</RegularTextMont>
					</div>
					<div className="flex flex-col">
						<Link
							className="p-2 w-full text-center text-green-500 font-kumbh hover:text-green-600 transition-colors ease-in-out duration-200"
							href="https://square.link/u/QKo4JLMA"
							target="_blank"
						>
							Donate
						</Link>
					</div>
				</div>
				<SmallGrayText className="pt-1">
					We appreciate donations to support our team. We hope you believe in
					our cause of making relationships and marriages the best they can be.
				</SmallGrayText>
				<div className="my-8 border-2 border-gray-300 rounded-md overflow-hidden">
					<div className=" flex flex-col">
						<button
							className="p-2 w-full text-blue-500 font-kumbh hover:text-blue-600 border-b-2 border-gray-300 transition-colors ease-in-out duration-200"
							onClick={() => logOut()}
						>
							Log Out
						</button>
						<button
							onClick={() => deleteUserSelf()}
							className="p-2 w-full text-red-500 font-kumbh hover:text-red-600 transition-colors ease-in-out duration-200"
							disabled={deleteLoading}
						>
							{deleteLoading ? (
								<div className="pt-4 flex items-end justify-center">
									<span className="p-1 bg-red-500 animate-loader rounded-full"></span>
									<span className="mx-2 p-1  bg-red-500 animate-loader animation-delay-200 rounded-full"></span>
									<span className="p-1 bg-red-500 animate-loader animation-delay-400 rounded-full "></span>
								</div>
							) : (
								<>Delete Account</>
							)}
						</button>
					</div>
					{deleteError ? (
						<ErrorText
							className="p-2 border-t-2 border-gray-300"
							text={deleteError}
						/>
					) : (
						<></>
					)}
				</div>
				<div className="flex items-end justify-between pt-6 border-t-2 border-gray-300">
					<Image
						className="pb-1"
						priority
						src={loadingImage}
						alt="loading"
						width={70}
						height={70}
					/>
					<SmallGrayText className="pl-2 ">
						Love Together uses third party services to handle payments, click{" "}
						<Link
							className="text-blue-500"
							href="https://support.stripe.com/questions/understanding-fees-for-refunded-payments"
							target="_blank"
						>
							here
						</Link>{" "}
						to view refund policy. Or email us at:
						customer-service@love-together.com
					</SmallGrayText>
				</div>
			</div>
		</div>
	);
};

Index.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Index;
