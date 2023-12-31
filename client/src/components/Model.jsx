import React, { useState } from "react";

import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setModelState } from "../store";

const Modal = () => {
  const isModal = useSelector((state) => state.model.isModelOpen);
  const dispatch = useDispatch();

  const modalData = useSelector((state) => state.model.modelData);

  return (
    <div>
      <div
        className={` ${
          isModal
            ? " transition-all fixed flex justify-center items-center bottom-0 top-0 left-0  backdrop-brightness-50 backdrop-blur-sm right-0 z-50"
            : "hidden"
        }  `}
      >
        <div className="  ">
          <div
            data-aos="fade-in"
            className=" shadow-xl rounded-xl bg-[#181818] w-[90vw] sm:w-[600px]"
          >
            <div className=" relative">
              <img
                className="  rounded-lg rounded-b-none w-full h-full"
                src={`https://image.tmdb.org/t/p/w500${modalData?.backdrop_path}`}
                alt="vvv"
              />
              <div
                onClick={() => dispatch(setModelState(false))}
                className=" absolute top-3 right-3 text-3xl sm:text-4xl text-white cursor-pointer drop-shadow-md  "
              >
                <RiCloseCircleLine />
              </div>
              <div className="left-5 flex items-center space-x-3 text-white bottom-5 absolute ">
                <div
                  className=" active:scale-95 cursor-pointer  bg-[#d41420]  text-white p-3 rounded-md font-semibold "
                  onClick={() =>
                    (window.location.href = `/player/${modalData?.id}`)
                  }
                >
                  Watch now
                </div>
                {/* <IoAddCircleOutline
                  onClick={() => addToWatchList()}
                  className=" cursor-pointer text-4xl"
                /> */}
              </div>
            </div>
            <div className=" p-7 sm:p-10">
              <h1 className=" text-white text-2xl font-bold">
                {modalData?.name}
              </h1>
              <h2 className=" line-clamp-4 text-white mt-5 sm:text-lg font-medium">
                {modalData?.overview}
              </h2>

              <hr className=" my-5" />

              <h1 className=" text-white text-xl font-medium">
                Info on{" "}
                <span className=" font-semibold">{modalData?.name}</span>
              </h1>

              <div className=" font-semibold mt-5 text-[#636363]">
                <div>
                  Release date :{" "}
                  <span className=" text-white">{modalData?.release_date}</span>
                </div>
                <div>
                  Average vote :
                  <span className=" text-white">{modalData?.vote_average}</span>
                </div>
                <div>
                  Original Language :
                  <span className=" text-white">
                    {modalData?.original_language}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
