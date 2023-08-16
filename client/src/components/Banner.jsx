import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { setModelData, setModelState } from "../store";

const Banner = React.memo(() => {
  const RandNum = Math.floor(Math.random() * 20);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const {
      data: { results },
    } = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}//trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setData(results[RandNum]);
  };

  return (
    <div className="hero relative">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
        }}
        className={`flex px-10 sm:px-20  relative    items-center bg-cover bg-center h-[90vh] rounded-b-xl   `}
      />

      <div className="container absolute bottom-20">
        <div className="logo w-40 sm:w-[700px]">
          <h1
            className="w-full h-full ml-6 text-3xl sm:text-6xl text-gray-200 font-bold"
            src={""}
            alt="logo"
          >
            {data?.title}
          </h1>
        </div>
        <div className=" -z-20 w-40 sm:w-2/4 ml-6 text-base  sm:text-2xl mt-5 text-gray-200 ">
          <p className=" line-clamp-3 drop-shadow-lg">{data?.overview}</p>
        </div>
        <div className="buttons flex ml-6 my-4 sm:my-8 sm:gap-8 gap-4">
          <button
            onClick={() => (window.location.href = "/splash")}
            className="flex justify-center bg-[#e50914]/90 px-2 py-1 sm:px-4 sm:py-3 text-gray-200 items-center text-sm sm:text-lg font-semibold sm:gap-4 gap-1 rounded-md p-2 sm:pl-8 sm:pr-10 border-none transition duration-300 ease-in-out hover:opacity-80"
          >
            <FaPlay /> Play
          </button>
          <button
            onClick={() =>
              dispatch(setModelState(true), dispatch(setModelData(data)))
            }
            className="flex justify-center items-center px-2 py-1 sm:px-4 sm:py-3 gap-1 sm:gap-4 rounded-md sm:p-2 sm:pl-8 sm:pr-10 border-none transition duration-300 ease-in-out hover:opacity-80 bg-[rgba(109,109,110,0.7)] text-white text-sm sm:text-3xl"
          >
            <AiOutlineInfoCircle /> More Info
          </button>
        </div>
      </div>
    </div>
  );
});

export default Banner;
