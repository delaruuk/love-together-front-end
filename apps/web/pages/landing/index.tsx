import Image from "next/image";
import PillButtonLink from "ui/Links/PillButtonLink";
import SmallGrayText from "ui/Text/SmallGrayText";
import TitleText from "ui/Text/TitleText";
import Link from "next/link";

import type { NextPageWithLayout } from "models";
import LandingLayout from "ui/Layouts/LandingLayout";
import PillButton from "ui/Buttons/PillButton";
import { useEffect, useState } from "react";
import { useAuthContext } from "context";

import React from "react";

const youtubeImage = require("assets/youtube.svg");
const instagramImage = require("assets/instagram.svg");
const facebookImage = require("assets/facebook.svg");
const tiktokImage = require("assets/tiktok.svg");

const Landing: NextPageWithLayout = () => {
  const { user } = useAuthContext();

  return (
    <div
      className="px-4 max-w-sm font-mont"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="flex flex-col py-8 items-start"
        style={{ marginLeft: "-10em", marginTop: "0em" }}
      >
        <h1
          className="text-6xl text-white font-bold"
          style={{ textAlign: "left", marginTop: "-0.5rem" }}
        >
          lovetogether
        </h1>
        <h2 className="text-3xl text-white mt-3">Building a better forever</h2>

        <p className="lt-description mt-5 text-white">
          LoveTogether supports tough conversations and real-life relationship
          obstacles, helping you become the ideal partner that you and your
          significant other deserve.
        </p>
      </div>
      <div
        className="relative flex flex-col gap-4 z-0"
        style={{ marginTop: "-20%", marginLeft: "80%", width: "20vw" }}
      >
        {user ? (
          <PillButtonLink variant="expand" link="/home" text="Home" />
        ) : (
          <>
            <PillButtonLink
              variant="expand"
              link="/sign-up"
              text="Sign Up"
            />
            <PillButtonLink variant="expand" link="/sign-in" text="Login" />
          </>
        )}
      </div>
      <div className="absolute bottom-7 left-10">
        {/* <p className="pb-2 pt-8 text-2xl font-bold">Socials</p> */}
        <ul className="flex gap-4 justify-center social-links">
          <li>
            <Link
              className="w-min hover:opacity-80 transition-opacity ease-in-out duration-200"
              href="https://www.instagram.com/lovetogetherhq/"
              target="_blank"
            >
              <Image
                priority
                src={instagramImage}
                alt="loading"
                width={25}
                height={25}
              />
            </Link>
          </li>
          <li>
            <Link
              className="w-min hover:opacity-80 transition-opacity ease-in-out duration-200"
              href="https://www.tiktok.com/@lovetogetherhq"
              target="_blank"
            >
              <Image
                priority
                src={tiktokImage}
                alt="loading"
                width={25}
                height={25}
              />
            </Link>
          </li>
          <li>
            <Link
              className="w-min hover:opacity-80 transition-opacity ease-in-out duration-200"
              href="https://www.youtube.com/@loveTogetherHQ"
              target="_blank"
            >
              <Image
                priority
                src={youtubeImage}
                alt="loading"
                width={25}
                height={25}
              />
            </Link>
          </li>
          <li>
            <Link
              className="w-min hover:opacity-80 transition-opacity ease-in-out duration-200"
              href="https://www.facebook.com/LovetogetherHQ"
              target="_blank"
            >
              <Image
                priority
                src={facebookImage}
                alt="loading"
                width={25}
                height={25}
              />
            </Link>
          </li>
        </ul>
      </div>
      <Link
        className="absolute bottom-6 right-12 text-2xl font-bold text-white hover:underline"
        href={"/info"}
      >
        Important info
      </Link>
      {/* <Link className="absolute bottom-6 right-12 text-2xl font-bold text-white hover:underline" href="https://square.link/u/QKo4JLMA">
				Donate
			</Link> */}

      {/* <div className="overflow-y-auto h-screen">
					<WhoWeAre />
				</div> */}
    </div>
  );
};

Landing.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Landing;