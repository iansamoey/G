import React, { useState } from "react";
import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "../ui/Search";
import OutsideClickHandler from "react-outside-click-handler";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`h-[5.5rem] bg-secondary text-[0.8rem] lg:text-[1rem] z-40 relative ${
        router.asPath === "/" ? "bg-transparent" : "bg-secondary"
      } `}
    >
      <div className="container text-white mx-auto flex justify-between items-center h-full">
        <Logo />

        <nav
          className={`sm:static absolute top-0 left-0  sm:h-auto sm:w-auto w-full h-screen  sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden ${
            isMenuModal === true && "!grid place-content-center"
          } `}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">Home</a>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">Menu</a>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">About</a>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">Book Table</a>
            </li>
            <li className="px-[5px] py-[40px] uppercase hover:text-primary cursor-pointer">
              <a href="#" className="inline-block sm:hidden">
                <button className="btn-primary">Order Online</button>
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex gap-x-4 items-center">
          <a href="#">
            <FaUserAlt className="hover:text-primary transition-all" />
          </a>
          <a href="#">
            <FaShoppingCart className="hover:text-primary transition-all" />
          </a>
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="hover:text-primary transition-all" />
          </button>
          <a href="#" className="sm:inline-block hidden">
            <button className="btn-primary">Order Online</button>
          </a>
          <button
            className="sm:hidden inline-block"
            onClick={() => {
              setIsMenuModal(true);
            }}
          >
            <GiHamburgerMenu className="text-xl" />
          </button>
          {isMenuModal && (
            <button
              className="absolute top-3 right-3 "
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel
                size={25}
                className="hover:text-primary transition-all text-black"
              />
            </button>
          )}
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;