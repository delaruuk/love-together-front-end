import type { Notification } from "models";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "context";
import { addPartner, declinePartner, getNotifications } from "utils";
import SmallGrayText from "../Text/SmallGrayText";
import RegularTextMont from "../Text/RegularTextMont";
import ErrorText from "../Text/ErrorText";

const NotificationCards = () => {
	const queryClient = useQueryClient();
	const { user, setUserInfo } = useAuthContext();
	const [notificationError, setNotificationError] = useState<string | null>(
		null
	);
	const { data, isLoading, isError, error } = useQuery(
		["notifications", user],
		() => getNotifications(user),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: !!user,
		}
	);

	const acceptPartner = async (notification: Notification) => {
		try {
			const newUserInfo = await addPartner(user, notification._id);
			queryClient.invalidateQueries({
				queryKey: "notifications",
				refetchInactive: true,
			});
			setUserInfo(newUserInfo);
		} catch (error) {
			const queryError = error as unknown;
			if (queryError instanceof AxiosError) {
				setNotificationError(
					queryError?.response?.data.errorMessage
						? queryError?.response?.data.errorMessage
						: error
				);
			}
		}
	};

	const rejectPartner = async (notification: Notification) => {
		try {
			const newUserInfo = await declinePartner(user, notification._id);
			queryClient.invalidateQueries({
				queryKey: "notifications",
				refetchInactive: true,
			});
			setUserInfo(newUserInfo);
		} catch (error) {
			const queryError = error as unknown;
			if (queryError instanceof AxiosError) {
				setNotificationError(
					queryError?.response?.data.errorMessage
						? queryError?.response?.data.errorMessage
						: error
				);
			}
		}
	};

	if (isLoading) {
		return (
			<div className="py-2 mx-auto max-w-md w-full place-items-center animate-pulse pointer-events-none">
				<p className="text-lg font-medium">Partner Requests:</p>
				<div className="p-3 flex flex-col justify-between shadow-md shadow-gray-400 rounded-md bg-white text-gray-400">
					<div className="flex justify-between items-center">
						<span className="w-[40%] bg-gray-400 rounded-full">N/A</span>
						<span className="ml-2 w-[10px] h-[10px] rounded-full bg-blue-500"></span>
					</div>
					<span className="my-1 w-full bg-gray-400 rounded-full ">N/A</span>
					<span className="w-[25%] bg-gray-400 rounded-full">N/A</span>
					<div className="pt-2 flex items-end justify-between">
						<div className="flex gap-2">
							<button className="py-0.5 px-2 text-white bg-gray-400 text-gray-400 rounded">
								Loading
							</button>
							<button className="py-0.5 px-1 text-white bg-gray-400 text-gray-400 rounded">
								Loading
							</button>
						</div>
						<span className="w-[15%] bg-gray-400 rounded-full">N/A</span>
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		const queryError = error as unknown;
		if (queryError instanceof AxiosError) {
			return (
				<div className="relative h-full w-full flex flex-col justify-center items-center text">
					<p>{`Something went wrong${
						queryError?.response?.data.errorMessage
							? `: ${queryError?.response?.data.errorMessage}`
							: ""
					}`}</p>
				</div>
			);
		}
	}
	return (
		<div className="flex flex-col  items-center justify-center">
			<div
				className={`${data?.length > 1 ? "py-2" : ""} ${
					data?.length >= 2 ? "max-w-md sm:max-w-4xl" : "max-w-md"
				} w-full`}
			>
				{data?.length > 0 ? (
					<RegularTextMont className="!text-lg">
						Partner Requests:
					</RegularTextMont>
				) : null}
				<div
					className={`w-full grid ${
						data?.length >= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
					} gap-4 place-items-center`}
				>
					{data?.map((notification: Notification) => (
						<div
							key={notification._id}
							className="p-3 flex flex-col justify-between shadow-md shadow-gray-400 rounded-md bg-white"
						>
							<div className="flex justify-between items-center">
								<SmallGrayText>New partner request 🔥</SmallGrayText>
								<span className="ml-2 w-[10px] h-[10px] rounded-full bg-blue-500"></span>
							</div>
							<RegularTextMont>{notification.message}</RegularTextMont>
							<div className="pt-2 flex items-end justify-between">
								<div className="flex gap-2 font-kumbh font-semibold">
									<button
										className="py-0.5 px-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out duration-200 rounded"
										onClick={() => acceptPartner(notification)}
									>
										Accept
									</button>
									<button
										className="py-0.5 px-1 text-white bg-red-500 hover:bg-red-600  transition-colors ease-in-out duration-200 rounded"
										onClick={() => rejectPartner(notification)}
									>
										Decline
									</button>
								</div>
								<SmallGrayText>
									{new Date(notification.createdAt).toLocaleTimeString(
										"en-US",
										{
											timeZoneName: "short",
											hour: "numeric",
											month: "short",
											day: "numeric",
										}
									)}
								</SmallGrayText>
							</div>
						</div>
					))}
				</div>
				{notificationError ? <ErrorText text={notificationError} /> : <></>}
			</div>
		</div>
	);
};

export default NotificationCards;
