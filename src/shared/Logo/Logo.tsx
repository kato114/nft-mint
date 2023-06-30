import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.png";
import logoGif from "images/logo.gif";
import logoLightImg from "images/logo-light.png";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <div className="flex flex-row justify-center items-center">
          <img
            className={` max-h-12 pr-2`}
            src={img}
            alt="Logo"
          />
          <h2 className="text-white">BATTLEGROUND ONE</h2>
        </div>
      ) : (
        "Logo Here"
      )}
      {/* {imgLight && (
        <img
          className="hidden max-h-12 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )} */}
    </Link>
  );
};

export default Logo;
