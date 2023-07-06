import Image from "next/image";

type ImageButtonProps = {
	src: any;
	alt: string;
	onClick: () => void;
};

const ImageButton = ({ src, alt, onClick }: ImageButtonProps) => {
	return (
		<button
			className="hover:opacity-80 transition-opacity ease-in-out duration-200"
			type="button"
			onClick={() => onClick()}
		>
			<Image src={src} width={40} height={40} alt={alt} />
		</button>
	);
};

export default ImageButton;
