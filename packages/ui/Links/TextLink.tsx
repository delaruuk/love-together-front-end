import Link from "next/link";

type TextLinkProps = {
	className?: string;
	link: string;
	target?: "_blank";
	queryName?: string;
	queryParam?: string;
	children: React.ReactNode;
};

const TextLink = ({
	className,
	link,
	target,
	queryName,
	queryParam,
	children,
}: TextLinkProps) => {
	return (
		<Link
			className={`text-blue-500 text-sm font-mont hover:underline ${
				className ? className : ""
			}`}
			target={target}
			href={
				queryName && queryParam
					? {
							pathname: link,
							query: {
								[queryName]: queryParam,
							},
					  }
					: {
							pathname: link,
					  }
			}
		>
			<>{children}</>
		</Link>
	);
};

export default TextLink;
