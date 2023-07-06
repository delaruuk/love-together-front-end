import AdminSidePanel from "../Admin/AdminSidePanel";
import { useAuthContext } from "context";
import { HtmlHTMLAttributes, useRef } from "react";

interface AdminLayoutProps {
	children: React.ReactNode | React.ReactElement;
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
	const main = useRef<HTMLElement | null>(null);
	const { userInfo } = useAuthContext();

	if (userInfo && !userInfo.isAdmin) {
		return (
			<div className="relative h-full w-full flex flex-col justify-center items-center text">
				<p>You are not authorized to view this page</p>
			</div>
		);
	}

	return (
		<div className="flex h-full w-full">
			<AdminSidePanel />
			<main ref={main} className="px-4 pb-4 relative flex-1 overflow-scroll">
				{children}
			</main>
		</div>
	);
};

export default AdminLayout;
