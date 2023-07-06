import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "firebase-config/firebaseConfig";
import { useAuthContext } from "context";
import Image from "next/image";
import { useEffect, useState } from "react";
import PillButtonLink from "../Links/PillButtonLink";

const logoImage = require("assets/logo.png");
const textLogoImage = require("assets/text-logo.svg");
const logoutImage = require("assets/logout.svg");

const Header = () => {
	const router = useRouter();
	const { user, userLoading, userInfo } = useAuthContext();
	const [mobileActive, setMobileActive] = useState<boolean>(false);

	const changePositioning = () => {
		if (router.asPath === "/") {
			return `${
				mobileActive ? "fixed h-full" : "sticky"
			} md:fixed top-0 left-0 z-50 md:h-max w-full `;
		} else {
			return `${
				mobileActive ? "fixed h-full" : "sticky"
			} md:sticky top-0 left-0 z-50 md:h-max w-full`;
		}
	};

	const logOut = async () => {
		await signOut(auth);
		await router.push("/");
	};

	useEffect(() => {
		setMobileActive(false);
	}, [router]);

	return (
		<div className={changePositioning()}>
			<nav
				className={`${
					mobileActive ? "h-full" : ""
				} md:h-max  py-3 px-4 flex flex-col md:flex-row md:justify-between text-white ${
					userInfo && userInfo.subscriptionStatus === "Premium"
						? "bg-black"
						: "bg-black" // Functionality for changing color of header
				}`}
			>
				<ul className="flex items-center justify-between">
					<li className="w-max">
						<Link
							className="flex items-center hover:scale-110 transition-translation ease-in-out duration-200"
							href="/home"
						>
							<Image
								priority
								src={logoImage}
								alt="Love Together"
								width={35}
								height={35}
							/>
							<Image
								className="pt-1 ml-2"
								priority
								src={textLogoImage}
								alt="Love Together"
								width={150}
							/>
						</Link>
					</li>
					<li className="md:hidden">
						<button
							className="uppercase tracking-wide font-kumbh font-semibold"
							onClick={() => setMobileActive(!mobileActive)}
						>
							Menu
						</button>
					</li>
				</ul>
				<ul
					className={`${
						mobileActive ? "h-full" : "hidden"
					} flex flex-col md:flex md:h-max md:flex-row items-center justify-center md:justify-end  gap-8 md:gap-15  text-xl md:text-base uppercase tracking-wide [&>li]:pb-8  md:[&>li]:pb-0 md:[&>li]:pr-2 last:[&>li]:p-0 first font-kumbh font-semibold`}
				>
					<li>
						<Link className="hover:underline" href="/compatibility">
							Donate
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href="/blog">
							Blog
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href="/who-we-are">
							About
						</Link>
					</li>
					<li className="flex items-center border-none">
						{user ? (
							<PillButtonLink variant="expand" link="/home" text="Home" />
						) : (
							<PillButtonLink
								variant="expand"
								link="/sign-up"
								text="Try for Free"
							/>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
