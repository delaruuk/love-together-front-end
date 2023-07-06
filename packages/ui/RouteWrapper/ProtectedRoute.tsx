import { useAuthContext } from "context";
import PageLoading from "../Loading/PageLoading";
import Link from "next/link";
import { useRouter } from "next/router";
import TextLink from "ui/Links/TextLink";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const router = useRouter();
	const { user, userLoading, userInfo, userInfoLoading } = useAuthContext();

	// unauthenticated routes
	if (
		router.pathname.includes("/sign-in") ||
		router.pathname.includes("/sign-up") ||
		router.pathname.includes("/terms") ||
		router.pathname.includes("/privacy-policy") ||
		router.pathname.includes("/recover") ||
		router.pathname.includes("/who-we-are") ||
		router.pathname.includes("/info") ||
		router.pathname === "/"
	) {
		return <>{children}</>;
	}

	// authenticated routes
	else {
		if (
			(router.pathname.includes("/compatibility") &&
				router.pathname !== "/compatibility") ||
			router.pathname.includes("/partners") ||
			router.pathname.includes("/admin") ||
			router.pathname.includes("/profile") ||
			router.pathname.includes("/insights")
		) {
			if (userInfoLoading) {
				return <PageLoading />;
			}
			if (!userInfoLoading && !userInfo) {
				return (
					<div className="relative h-full w-full flex flex-col justify-center items-center text">
						<p className="text-center">
							Please answer the sign-up{" "}
							<TextLink link="/sign-up/questions">questions</TextLink> before
							continuing
						</p>
					</div>
				);
			}
			return <>{children}</>;
		} else {
			if (userLoading) {
				return <PageLoading />;
			}
			if (!userLoading && !user) {
				return (
					<div className="h-full w-full text-black flex justify-center items-center">
						<p>You need to be signed in to view this page</p>
					</div>
				);
			}
			return <>{children}</>;
		}
	}
};

export default ProtectedRoute;
