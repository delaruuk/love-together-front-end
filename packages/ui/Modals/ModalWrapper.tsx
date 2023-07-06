import React, { useEffect } from "react";
import ModalLoading from "../Loading/ModalLoading";

interface ModalWrapperProps {
	children: React.ReactNode | React.ReactNode[];
	showModal: {
		isActive: boolean;
		modalContent: any;
		modalType: any;
	};
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			isActive: boolean;
			modalContent: any;
			modalType: any;
		}>
	>;
}

const ModalWrapper = ({
	children,
	showModal,
	setShowModal,
}: ModalWrapperProps) => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	return (
		<div className="p-4 z-50 fixed left-0 top-0 grid place-items-center h-full w-full bg-black bg-opacity-40">
			<div
				className="fixed top-0 left-0 h-full w-full"
				onClick={() => setShowModal({ ...showModal, isActive: false })}
			></div>
			<div className="relative max-h-[95%] max-w-md w-full p-4 overflow-scroll bg-white rounded-md">
				<>{children}</>
			</div>
		</div>
	);
};

export default ModalWrapper;
