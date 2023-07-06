import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminSidePanel = () => {
	const router = useRouter();
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		setIsActive(false);
	}, [router]);
	return (
		<>
			<aside
				// className="hidden lg:inline-block p-4 bg-main text-white"
				className={`${
					isActive ? "inline-block" : "hidden"
				} lg:inline-block fixed lg:static h-full  p-4 bg-main text-white z-40`}
			>
				<ul className="uppercase tracking-wide font-kumbh font-semibold">
					<li>
						<Link className="hover:underline" href={"/admin/users"}>
							Users
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href={"/admin/user-questions"}>
							User Questions
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href={"/admin/survey-questions"}>
							Survey Questions
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href={"/admin/survey-categories"}>
							Survey Categories
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href={"/admin/admin-info"}>
							Admin Info
						</Link>
					</li>
					<li>
						<Link className="hover:underline" href={"/home"}>
							App
						</Link>
					</li>
				</ul>
			</aside>
			<div
				className={`bg-white opacity-60 ${
					isActive ? "inline-block" : "hidden"
				} fixed h-full w-full z-30`}
				onClick={() => setIsActive(false)}
			></div>
			<button
				className="space-y-1 lg:hidden fixed top-0 right-0 z-50 p-4 font-kumbh font-semibold"
				onClick={() => setIsActive(!isActive)}
			>
				<div className="w-4 h-0.5 bg-gray-600"></div>
				<div className="w-2 h-0.5 bg-gray-600"></div>
				<div className="w-3 h-0.5 bg-gray-600"></div>
			</button>
		</>
	);
};

export default AdminSidePanel;
