import React from "react";
import logo from "../assets/logo.png";
const Header = (props) => {

  return (
    <div className="py-0 px-5 sm:px-16 flex items-center justify-between">
      <div className="">
        <img className="h-16 sm:h-20" src={logo} alt="logo" />
      </div>
      <button
        onClick={() =>
          (window.location.href = props.login ? "/login" : "/signup")
        }
        className="px-4 py-1 sm:px-4 sm:py-2 bg-[#e50914] border-none text-white rounded-md font-bold text-lg"
      >
        {props.login ? "login" : "sign up"}
      </button>
    </div>
  );
};

export default Header;
