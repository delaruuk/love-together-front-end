import Image from "next/image";

const loadingImage = require("assets/logo.svg");

const PageLoading = () => {
	return (
		<div className="relative h-full w-full flex flex-col justify-center items-center">
			<Image
				className="animate-pulse"
				priority
				src={loadingImage}
				alt="loading"
				width={300}
				height={300}
			/>
		</div>
	);
};

export default PageLoading;
