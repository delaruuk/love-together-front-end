import Link from "next/link";
import PillButtonLink from "./PillButtonLink";

type LandingLinkProps = {
	buttonLink: boolean;
	text: string;
};

const LandingLink = ({ buttonLink, text }: LandingLinkProps) => {
	if (buttonLink) {
		return (
			<PillButtonLink
				className="text-xl md:text-2xl w-max"
				variant="white-pill"
				link="/sign-up"
				text={text}
			/>
		);
	} else {
		return (
			<Link
				href="/sign-up"
				className="text-center md:text-start font-bold hover:text-secondary transition-colors duration-200 ease-in-out text-xl md:text-2xl"
			>
				{text} {">"}
			</Link>
		);
	}
};

export default LandingLink;
