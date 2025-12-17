import React, { useState } from "react";
import LogoWebsite from "../../../assets/logo-white.jpg";
import { TbMenu } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

const MobileSideBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div className="lg:hidden flex items-center justify-between text-gray-800">
      <div>
        <img
          src={LogoWebsite}
          alt="Logo"
          className="h-20 w-20 m-4 rounded-full shadow-xl"
        />
        <span className="ml-6 font-bold text-gray-400">SAYO PROFITS</span>
      </div>
      <button scale="sm" class="sc-4142778f-0 gONgRy">
        <p
          scale="sm"
          class="sc-4142778f-1 eePRmx text-[13px]"
          onClick={isConnected ? () => open("Account") : () => open("Connect")}
        >
          {isConnected
            ? `${address.substring(0, 6)}...${address.substring(
                address.length - 4
              )}`
            : "CONNECT WALLET"}
        </p>
      </button>
      <div className="lg:hidden p-4">
        <button
          className="sc-faeae7f8-0 relative ePfABc flex justify-center items-center"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <TbMenu className="text-gray-800 w-8 h-8 font-thin" />
          ) : (
            <TbMenu className="text-gray-800 w-8 h-8 font-thin" />
          )}
        </button>

        {isMenuOpen && (
          <div className="bg-white  absolute top-0 left-0 text-black h-[100vh] z-30 w-1/2 p-4">
            <ul className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div>
                  <img
                    src={LogoWebsite}
                    alt="Logo"
                    className="h-10 w-10 m-4 rounded-full shadow-xl"
                  />
                  <span className="font-bold text-gray-400">SAYO PROFITS</span>
                </div>
                <span
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="text-2xl cursor-pointer w-7 text-center hover:text-gray-500"
                >
                  X
                </span>
              </div>
              <Link to="/" className="font-bold text-start text-[#17144D]">
                ENERGY GROWTH
                <br />
                 PAMM FOUND
              </Link>
              <Link
                to="https://teller-usd.gitbook.io/sayoprofits/"
                className="font-bold text-[#17144D] capitalize"
              >
                WHITEPAPER
              </Link>
              <Link
                to="https://x.com/SayoProfits?t=sAR8HlJuPLov8wRvU2CxEA&s=08"
                className="font-bold text-[#17144D]"
              >
                TWITTER
              </Link>
              <Link
                to="https://t.me/SayoProfits"
                className="font-bold text-[#17144D]"
              >
                TELEGRAM
              </Link>
              <Link
                to="https://youtube.com/@SayoProfits"
                className="font-bold text-[#17144D]"
              >
                YOUTUBE
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSideBar;
