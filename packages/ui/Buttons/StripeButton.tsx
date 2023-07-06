import { useAuthContext } from "context";
import { AxiosError } from "axios";
import { stripeCheckout } from "utils";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorText from "../Text/ErrorText";

const StripeButton = () => {
	const router = useRouter();
	const { user, userInfo } = useAuthContext();
	const [stripeLoading, setStripeLoading] = useState<boolean>(false);
	const [stripeError, setStripeError] = useState<string | null>();

	const checkout = async () => {
		setStripeLoading(true);
		try {
			const redirectUrl = await stripeCheckout(user);
			router.push(redirectUrl.url);
		} catch (error: unknown) {
			const queryError = error as unknown;
			if (queryError instanceof AxiosError) {
				setStripeError(
					queryError?.response?.data.errorMessage
						? queryError.response.data.errorMessage
						: error
				);
			}
		}
		setStripeLoading(false);
	};

	return (
		<>
			<button
				className="p-2 w-full text-green-500 font-kumbh hover:text-green-600 transition-colors ease-in-out duration-200 disabled:text-gray-500"
				disabled={
					userInfo?.subscriptionStatus === "Premium" || stripeLoading
						? true
						: false
				}
				onClick={() => checkout()}
			>
				{stripeLoading ? (
					<div className="pt-4 flex items-end justify-center">
						<span className="p-1 bg-green-500 animate-loader rounded-full"></span>
						<span className="mx-2 p-1 bg-green-500 animate-loader animation-delay-200 rounded-full"></span>
						<span className="p-1 bg-green-500 animate-loader animation-delay-400 rounded-full "></span>
					</div>
				) : (
					<>Get Premium</>
				)}
			</button>
			{stripeError ? (
				<ErrorText
					className="p-2 border-t-2 border-gray-300"
					text={stripeError}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default StripeButton;
