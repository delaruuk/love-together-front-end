import type { NextPageWithLayout } from "models";
import Image from "next/image";

const logoImage = require("assets/logo.png");
const textLogoImage = require("assets/text-logo.svg");

const youtubeImage = require("assets/youtube.svg");
const instagramImage = require("assets/instagram.svg");
const facebookImage = require("assets/facebook.svg");
const tiktokImage = require("assets/tiktok.svg");


const Index7: NextPageWithLayout = () => {
  return (
    <footer className="max-height-full h-full flex relative overflow-hidden">
      <div className="max-w-screen flex flex-row">
        <div className="flex flex-col mt-10 ml-2 mr-10">
            <p className="absolute bottom-2 left-2 text-sm text-black">2023, Love Together LLC &copy;</p>
        </div>
      </div>
      <div className="mx-4 my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2" style ={{ paddingLeft:'20%'}}>
        <div className="text-sm">
          <h3 className="font-semibold mb-4">About</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="font-semibold mb-4">Blog</h3>
          <ul>
            <li><a href="#">Latest Posts</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="font-semibold mb-4">Help</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="font-semibold mb-4">Socials</h3>
          <div className="flex gap-4">
            <a href="#"><Image src={tiktokImage} width={30} height={30} alt="Twitter" /></a>
            <a href="#"><Image src={instagramImage} width={30} height={30} alt="Instagram" /></a>
            <a href="#"><Image src={youtubeImage} width={30} height={30} alt="Instagram" /></a>
            <a href="#"><Image src={facebookImage} width={30} height={30} alt="Facebook" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Index7;
