import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "context";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

const logoImage = require("assets/logo.png");
const textLogoImage = require("assets/text-logo.svg");

type OldLandingLayoutProps = {
  children: React.ReactNode;
};

const OldLandingLayout = ({ children }: LandingLayoutProps) => {
  const router = useRouter();
  const { user } = useAuthContext();

  // Video and parallax effect
  const backgroundVideo = require("assets/lt_landing_video.mp4");
  const parallaxVideoRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (parallaxVideoRef.current) {
      const scrollY = window.pageYOffset;
      parallaxVideoRef.current.style.transform = `translateY(${
        scrollY * 0.5
      }px)`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // TOP RECTANGLE W/ LT LOGO
    <div className="flex flex-col h-full w-full">
      <header
        className="header-rectangle mb-10"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul>
          <li>
            <Link
              className="flex items-center hover:scale-110 transition-translation ease-in-out duration-200"
              href="/"
			  style = {{ marginTop: "-1.25em" }}
            >
              <Image
                priority
                src={logoImage}
                alt="Love Together"
                width={40}
                height={40}
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
        </ul>
      </header>
      {/* LINKS IN HEADER */}
      <header
        className="relative top-20 left-0 w-full bg-black" 
        style={{ zIndex: 2, marginTop: '-1em' }}
      >
        <nav className="py-3 px-4 flex justify-between text-white">
          <ul className="flex items-center [&>li]:pl-2 uppercase tracking-wide font-kumbh font-semibold">
            {user ? (
              <li className=" pr-2 border-r-2 border-secondary">
                <Link className="hover:underline" href="/home">
                  App
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li>
			  <Link className="hover:underline -ml-2" href="https://square.link/u/QKo4JLMA">
				Donate
			  </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="parallax-container">
        <main className="flex-1 relative">
          <div className="parallax-video" ref={parallaxVideoRef}>
            <video id="background-video" autoPlay loop muted>
              <source src={backgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute bottom-0 w-full h-20 bg-black from-secondary to-main opacity-100"></div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default OldLandingLayout;