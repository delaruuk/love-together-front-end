import Link from "next/link";
import { useState } from "react";

interface PillButtonLinkProps {
  className?: string;
  link: string;
  text: string;
  variant: "main" | "clear-white" | "clear-black" | "white" | "secondary" | "expand" | "white-pill";
}

const PillButtonLink = ({
  className,
  link,
  text,
  variant,
}: PillButtonLinkProps) => {
  const chooseCss = () => {
    switch (variant) {
      case "clear-black":
        return "border-black rounded-full border-main text-black hover:text-main";
      case "clear-white":
        return "border-white rounded-full hover:border-main text-white hover:text-main";
      case "main":
        return "border-main rounded-full hover:border-main-dark bg-main hover:bg-main-dark text-white";
      case "white":
        return "text-main rounded-full border-black bg-white hover:bg-gray-200 hover:border-main";
      case "secondary":
        return "text-white rounded-full border-secondary bg-secondary hover:bg-secondary-dark hover:border-secondary-dark";
      case "expand":
        return "expand-button text-black border-secondary bg-black duration-500 ease-in-out hover:text-white";
      case "white-pill":
        return "bg-white rounded-full text-main hover:text-secondary"   
      default:
        return "";
    }
  };

  return (
    <Link
      className={`py-2 px-4 font-mako font-bold border-0 ${chooseCss()} text-center transition-colors transition-translation ease-in-out duration-20 ${
        className ? className : ""
      }`}
      href={link}
      style={{ padding: "0.5em 1.5em"}}
    >
      {text}
    </Link>
  );
};

export default PillButtonLink;
