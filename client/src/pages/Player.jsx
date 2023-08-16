import React from "react";
import { BsArrowLeft } from "react-icons/bs";
const Player = () => {
  return (
    <div>
      <div className="player w-screen h-screen">
        <div className="back absolute p-8 z-10">
          <BsArrowLeft
            className="text-5xl"
            onClick={() => (window.location.href = -1)}
          />
        </div>
        <video
          className="h-full w-full object-cover"
          src=""
          autoPlay
          loop
          controls
          muted
        ></video>
      </div>
    </div>
  );
};

export default Player;
