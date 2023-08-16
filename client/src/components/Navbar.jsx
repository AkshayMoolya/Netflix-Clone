import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utilis/Firebase-config";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const Navbar = ({ isScrolled, down }) => {
  const [menu, setMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const Links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tvshows" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearch(false);

    window.location.href = `/search/${searchText}`;
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) window.location.href = "/login";
  });

  return (
    <div className="relative">
      <div className="bg-gradient-to-b z-50 from-black fixed left-0 right-0  ">
        <div
          className={`flex ${
            isScrolled
              ? "transition duration-500 bg-gradient-to-b from-black to-black"
              : "bg-gradient-to-b from-black bg-transparent opacity-90"
          } top-0 sm:h-24 w-full justify-between fixed z-10 py-0 px-4 sm:px-16  flex items-center transition duration-[0.3s] ease-in-out`}
        >
          <div className="left gap-8  flex items-center ">
            <div className="brand flex items-center justify-center py-4">
              <img
                src="https://res.cloudinary.com/dewctbby3/image/upload/v1647661407/netflixLogo_wdgzbv.png"
                alt=""
                className="w-14  sm:hidden"
                onClick={() => (window.location.href = "/")}
              />
              <img
                className="h-16 sm:flex hidden"
                onClick={() => (window.location.href = "/splash")}
                src={logo}
                alt="logo"
              />
            </div>

            <ul className="link hidden sm:flex sm:gap-8">
              {Links.map(({ name, link }) => {
                return (
                  <li className="text-white cursor-pointer" key={name}>
                    <button
                      className="hover:scale-105 transition-all"
                      onClick={() => (window.location.href = link)}
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="right flex items-center gap-7 ">
            <div className=" flex items-center space-x-2  ">
              <form onSubmit={handleSubmit}>
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder=" Search movies, series"
                  className={` ${
                    isSearch ? " w-40 sm:w-56 p-1 border" : " w-0  "
                  }  outline-none transition-all text-white bg-transparent  placeholder:text-white px-2  rounded-lg `}
                  type="text"
                />
              </form>
              <FiSearch
                onClick={() => setIsSearch(!isSearch)}
                className=" cursor-pointer text-white  text-2xl "
              />
            </div>
            <button
              className="text-[#f34242] text-lg"
              onClick={() => signOut(firebaseAuth)}
            >
              <FaPowerOff />
            </button>
          </div>
        </div>
        <div
          onClick={() => setMenu(true)}
          className={` ${down ? "hidden" : ""} ${
            menu ? "hidden" : ""
          } bg-[#292929]/60 text-white backdrop-blur-sm flex items-center px-5 justify-center w-28 mx-auto rounded-lg mt-14 py-2 text-sm sm:hidden z-40 `}
        >
          <p>Discover</p> <IoMdArrowDropdown />
        </div>
      </div>
      <div
        className={`  transition-all ${
          menu ? " top-0" : "-top-[100vh]"
        } absolute w-screen h-screen bg-gradient-to-b z-30  from-black`}
      >
        <div className=" mt-20 z-20  text-xl text-white flex flex-col justify-center items-center space-y-5 ">
          <button
            className="hover:scale-105 transition-all"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
          <button
            className="hover:scale-105 transition-all"
            onClick={() => (window.location.href = "/movies")}
          >
            Movies
          </button>
          <button
            className="hover:scale-105 transition-all"
            onClick={() => (window.location.href = "/tvshows")}
          >
            Tv Shows
          </button>
          <button
            className="hover:scale-105 transition-all"
            onClick={() => (window.location.href = "/mylist")}
          >
            My List
          </button>
        </div>
        {menu && <div onClick={() => setMenu(false)} className=" h-full"></div>}
      </div>
    </div>
  );
};

export default Navbar;
