import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { useAuthContext } from "context";
import {
	getPartner,
	addPartner,
	removePartner,
	requestPartner,
	cancelRequestPartner,
} from "utils";
import PillButton from "../Buttons/PillButton";
import { useEffect, useState } from "react";
import SingleStepTextInput from "../InputFields/SingleStepTextInput";
import { MongoUser, PendingPartner } from "models";
import TextLink from "./TextLink";
import PageLoading from "../Loading/PageLoading";
import { AxiosError } from "axios";
import TitleText from "../Text/TitleText";
import SmallGrayText from "../Text/SmallGrayText";
import TextTag from "../Text/TextTag";
import RegularTextMont from "../Text/RegularTextMont";
import ErrorText from "../Text/ErrorText";

const unfinishedImage = require("assets/unfinished.svg");

const PartnerCardLinks = () => {
	const { user, userInfo, setUserInfo } = useAuthContext();
	const [showInput, setShowInput] = useState(false);
	const [formValues, setFormValues] = useState<{
		[key: string]: string;
	}>({
		partner: "",
	});
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

	const requestAPartner = async () => {
		try {
			const newPartners = await requestPartner(user, formValues.partner);
			setUserInfo(newPartners);
			setShowInput(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				setFormErrors({ partner: error.response?.data.errorMessage });
			}
		}
	};

	const validate = () => {
		const errors: { [key: string]: string } = {};
		if (
			!formValues.partner ||
			formValues.partner === "" ||
			formValues.partner === " "
		) {
			errors.partner = "Please input a valid share code";
		}
		return errors;
	};

	const handleSubmit = () => {
		const errors = validate();
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			requestAPartner();
		}
	};

	return (
		<>
			<div className="flex flex-col items-center last-of-type:[&>button]:mt-2">
				<div
					className={`py-2 ${
						userInfo && userInfo?.partners?.length >= 2
							? "max-w-md sm:max-w-4xl"
							: "max-w-md"
					} w-full`}
				>
					{userInfo && userInfo?.partners.length > 0 ? (
						<RegularTextMont className="!text-lg">Partners</RegularTextMont>
					) : (
						<RegularTextMont className="!text-lg !text-center">
							Partners: None
						</RegularTextMont>
					)}
					<div
						className={`w-full grid ${
							userInfo && userInfo?.partners?.length >= 2
								? "grid-cols-1 sm:grid-cols-2"
								: "grid-cols-1"
						} gap-4 place-items-center`}
					>
						{userInfo?.partners.map((partner, index) => (
							<PartnerCardLink key={partner + index} partner={partner} />
						))}
					</div>
				</div>
				<div
					className={`py-2 ${
						userInfo && userInfo?.pendingPartners?.length >= 2
							? "max-w-md sm:max-w-4xl"
							: "max-w-md"
					} w-full`}
				>
					{userInfo && userInfo?.pendingPartners.length > 0 ? (
						<RegularTextMont className="!text-lg !text-center">
							Pending Partners:
						</RegularTextMont>
					) : (
						<RegularTextMont className="!text-lg !text-center">
							Pending Partners: None
						</RegularTextMont>
					)}
					<div
						className={`w-full grid ${
							userInfo && userInfo?.pendingPartners?.length >= 2
								? "grid-cols-1 sm:grid-cols-2"
								: "grid-cols-1"
						} gap-4 place-items-center`}
					>
						{userInfo?.pendingPartners.map((partner) => (
							<div key={partner._id} className="max-w-md w-full">
								<PendingPartnerCard partner={partner} />
							</div>
						))}
					</div>
				</div>
				{showInput ? (
					<div className="my-2 p-3 max-w-md w-full shadow-md shadow-gray-400 rounded-md bg-white">
						<div className="flex first-of-type:[&>div]:flex-grow">
							<SingleStepTextInput
								type="text"
								name="partner"
								placeholder="Enter partner's share code"
								defaultValue={formValues.partner}
								isError={formErrors.partner ? true : false}
								formValues={formValues}
								setFormValues={setFormValues}
							/>
							<button
								className="ml-3 w-max h-max rounded-full p-1 bg-red-500 hover:bg-red-600 transition-colors ease-in-out duration-200"
								onClick={() => {
									setShowInput(false),
										setFormValues({ partner: "" }),
										setFormErrors({ partner: "" });
								}}
							>
								<Image
									src={unfinishedImage}
									alt="remove partner"
									width={20}
									height={20}
								/>
							</button>
						</div>
						{formErrors.partner ? (
							<ErrorText className="pt-1" text={formErrors.partner} />
						) : null}
					</div>
				) : null}
				<PillButton
					text="Request Partner"
					type="button"
					variant="clear-black"
					onClick={showInput ? () => handleSubmit() : () => setShowInput(true)}
				/>
			</div>
			<div className="pt-4 flex flex-wrap items-center justify-center gap-4">
				<div className="flex items-center">
					<span className="mr-2 p-3 h-min rounded-full bg-compatibility-great border-2 border-compatibility-great"></span>
					<RegularTextMont className="!font-normal">
						Celebratory Conversation
					</RegularTextMont>
				</div>
				<div className="flex items-center">
					<span className="mr-2 p-3 h-min rounded-full bg-compatibility-good border-2 border-compatibility-good"></span>
					<RegularTextMont className="!font-normal">
						Gentle Conversation
					</RegularTextMont>
				</div>
				<div className="flex items-center">
					<span className="mr-2 p-3 h-min rounded-full bg-compatibility-bad border-2 border-compatibility-bad"></span>
					<RegularTextMont className="!font-normal">
						Empathetic Conversation
					</RegularTextMont>
				</div>
			</div>
		</>
	);
};

export default PartnerCardLinks;

interface PartnerCardLinkProps {
	partner: string;
}

const PartnerCardLink = ({ partner }: PartnerCardLinkProps) => {
	const { user, userInfo, userInfoLoading, setUserInfo } = useAuthContext();
	const { data, isLoading, isError, error } = useQuery(
		["partner-compatibility", "overall", { partner: partner }, user],
		() => getPartner(user, partner),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);
	const [partnerError, setPartnerError] = useState<string>("");

	const chooseColor = () => {
		const catScore = Math.floor(data?.compatibilityScore * 100);
		if (catScore >= 70) {
			return "bg-compatibility-great border-2 border-compatibility-great";
		} else if (catScore < 70 && catScore >= 40) {
			return "bg-compatibility-good border-2 border-compatibility-good";
		} else if (catScore < 40) {
			return "bg-compatibility-bad border-2 border-compatibility-bad";
		}
		return "border-2 border-gray-500";
	};

	const deletePartner = async () => {
		try {
			const updatedPartners = await removePartner(user, partner);
			setUserInfo(updatedPartners);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				setPartnerError(error.response?.data.errorMessage);
			}
		}
	};

	const RenderFetchState = () => {
		if (isLoading) {
			return (
				<>
					<span className="p-3 h-min rounded-full mr-2 bg-gray-400 border-2 border-gray-400 animate-pulse"></span>
					<span className="py-3 px-10 w-xs rounded-full bg-gray-400 animate-pulse"></span>
				</>
			);
		}
		if (isError) {
			return (
				<>
					<span className="p-3 h-min rounded-full mr-2 bg-red-500"></span>
					<p className="text-red-500 font-kumbh">Error</p>
				</>
			);
		}
		return (
			<>
				<span className={`p-3 h-min rounded-full mr-2 ${chooseColor()}`}></span>
				<RegularTextMont>{data?.partnerName}</RegularTextMont>
			</>
		);
	};

	return (
		<div className="p-3 max-w-md w-full flex flex-col justify-between shadow-md shadow-gray-400 rounded-md bg-white hover:scale-105 transition-transform ease-in-out duration-200">
			<div className="flex flex-grow">
				<Link
					className="flex flex-grow items-center"
					href={{
						pathname: "/partners/partner",
						query: {
							shareCode: partner,
						},
					}}
				>
					<RenderFetchState />
				</Link>
				<button
					className="ml-3 w-max h-max rounded-full p-1 bg-red-500 hover:bg-red-600 transition-colors ease-in-out duration-200"
					onClick={() => deletePartner()}
				>
					<Image
						src={unfinishedImage}
						alt="remove partner"
						width={20}
						height={20}
					/>
				</button>
			</div>
			{partnerError ? (
				<ErrorText className="mt-1" text={partnerError}></ErrorText>
			) : null}
		</div>
	);
};

interface PendingPartnerCardProps {
	partner: PendingPartner;
}

const PendingPartnerCard = ({ partner }: PendingPartnerCardProps) => {
	const { user, setUserInfo } = useAuthContext();
	const [pendingError, setPendingError] = useState<string>();

	const cancelRequest = async () => {
		try {
			const newPartners = await cancelRequestPartner(
				user,
				partner.notification_id
			);
			setUserInfo(newPartners);
		} catch (error: unknown) {
			const queryError = error as unknown;
			if (queryError instanceof AxiosError) {
				setPendingError(
					queryError?.response?.data.errorMessage
						? queryError?.response?.data.errorMessage
						: error
				);
			}
		}
	};

	return (
		<div className="p-3 max-w-md w-full flex flex-col justify-between shadow-md shadow-gray-400 rounded-md bg-white">
			<div className="flex justify-between">
				<div className="flex items-center">
					<TextTag className="mr-2" text="Pending" color="sky" />
					<RegularTextMont>{partner.partnerName}</RegularTextMont>
				</div>
				<button
					className="w-max h-max p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors ease-in-out duration-200"
					onClick={() => cancelRequest()}
				>
					<Image
						src={unfinishedImage}
						alt="remove partner"
						width={20}
						height={20}
					/>
				</button>
			</div>
			{pendingError ? <ErrorText text={pendingError} /> : null}
		</div>
	);
};
