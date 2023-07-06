import Image from "next/image";

const loadingImage = require("assets/logo.svg");

const ModalLoading = () => {
	return (
		<div className="absolute top-0 left-0 h-full w-full grid items-center justify-center bg-white bg-opacity-60">
			<Image
				className="animate-pulse"
				priority
				src={loadingImage}
				alt="loading"
				width={150}
				height={150}
			/>
		</div>
	);
};

export default ModalLoading;
