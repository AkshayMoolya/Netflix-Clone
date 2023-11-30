import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const Player = () => {
  const { id } = useParams();
  const [video, setVideo] = useState("");

  const getvideo = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    getvideo();
  }, []);

  return (
    <div>
      <div className="player w-screen h-screen">
        <div className="back absolute p-8 z-10">
          <BsArrowLeft
            className="text-5xl"
            onClick={() => (window.location.href = "/")}
          />
        </div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video}`}
          controls
          width="100%"
          height="100%"
          style={{ backgroundColor: "#000000" }}
          playing={true}
        />
      </div>
    </div>
  );
};

export default Player;
