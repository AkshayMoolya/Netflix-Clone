import React from "react";
import background from "../assets/login.jpg";
const BackgroundImg = () => {
  return (
    <div className="h-screen w-screen">
      <img className="h-screen w-screen" src={background} alt="background" />
    </div>
  );
};

export default BackgroundImg;
