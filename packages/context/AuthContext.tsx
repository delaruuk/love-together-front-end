import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "firebase-config/firebaseConfig";
import { getUserData, putUser, updateUserEmail } from "utils";
import { MongoUser, FirebaseUser } from "models";
import { AxiosError } from "axios";

// import Cookies from "js-cookie";

interface AuthContextProps {
	user: FirebaseUser;
	userLoading: boolean;
	userInfo: MongoUser | null;
	userInfoLoading: boolean;
	setUserInfo: React.Dispatch<React.SetStateAction<MongoUser>>;
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	userLoading: true,
	userInfo: null,
	userInfoLoading: true,
	setUserInfo: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState<FirebaseUser>(null);
	const [userLoading, setUserLoading] = useState<boolean>(true);
	const [userInfo, setUserInfo] = useState<MongoUser>(null);
	const [userInfoLoading, setUserInfoLoading] = useState<boolean>(true);

	// listen for token changes
	// call setUser and write new token as a cookie
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (!user) {
				setUser(null);
				if (
					router.asPath.includes("/compatibility") ||
					router.asPath.includes("/home") ||
					router.asPath.includes("/partners") ||
					router.asPath.includes("/profile") ||
					router.asPath.includes("/settings") ||
					router.asPath.includes("/admin") ||
					router.asPath === "/sign-up/questions"
				) {
					router.push("/");
				}
				// Cookies.remove("user-token");
			} else {
				setUser(user);
				if (
					router.asPath.includes("/sign-in") ||
					router.asPath === "/sign-up"
				) {
					router.push("/home");
				}
				// Cookies.set("user-token", JSON.stringify(user));
			}
			setUserLoading(false);
		});
	}, []);

	const getUserInfo = async () => {
		if (!user) {
			setUserInfo(null);
		} else {
			try {
				const userInfoData = await getUserData(user);
				setUserInfo(userInfoData);
				setUserInfoLoading(false);
			} catch (error: unknown) {
				if (error instanceof AxiosError) {
					setUserInfo(null);
					setUserInfoLoading(false);
				}
			}
		}
	};

	const checkEmail = async () => {
		await updateUserEmail(user, user?.email as string);
	};

	useEffect(() => {
		getUserInfo();
	}, [user]);

	useEffect(() => {
		if (user && userInfo && user.email !== userInfo.username) {
			checkEmail();
		}
	}, [user, userInfo]);

	return (
		<AuthContext.Provider
			value={{ user, userLoading, userInfo, userInfoLoading, setUserInfo }}
		>
			{children}
		</AuthContext.Provider>
	);
};
