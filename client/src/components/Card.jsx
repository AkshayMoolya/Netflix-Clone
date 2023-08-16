import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utilis/Firebase-config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies, setModelData, setModelState } from "../store";
import { toast } from "react-toastify";

const Card = React.memo(({ movieData, isLiked }) => {
  const [isHovered, setISHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const location = useLocation();
  const show = location.pathname.includes("/search");

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser?.email);
    } else {
      window.location.href = "/login";
    }
  });

  const addToList = async () => {
    try {
      const res = await axios.post("https://relieved-smock.cyclic.cloud/api/user/add", {
        email,
        data: movieData,
      });
      if (res.status === 200) {
        toast.success("Movie added sucessfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(movieData)
  const src = `${process.env.REACT_APP_BASE_IMG_URL}${movieData?.backdrop_path}`;
  const fallBackSrc =
    "https://res.cloudinary.com/dewctbby3/image/upload/v1647663227/7dc497e2-4975-11ec-a9ce-066b49664af6_cm_1440w_dugogx.jpg";

  return (
    <div className="">
      <div
        className="text-white max-w-[90vw] sm:max-w-[330px] sm:w-[330px] sm:h-[200px] cursor-pointer relative "
        onMouseEnter={() => setISHovered(true)}
        onMouseLeave={() => setISHovered(false)}
      >
        <img
          className="rounded-md w-full h-full z-10 "
          onError={() => setImageError(true)}
          src={imageError ? fallBackSrc : src}
          alt="movie"
        />
        {isHovered && (
          <div className=" z-50 h-max w-80 absolute top-[-6vh] left-[-15] rounded-md custom-shadow bg-[#181818] transition duration-300 ease-in-out">
            <div className="image-video-container relative h-[140px]">
              <img
                className="w-full h-[140px] object-cover rounded-md top-0 z-20 absolute"
                onError={() => setImageError(true)}
                src={imageError ? fallBackSrc : src}
                alt="movie"
                onClick={() => (window.location.href = "/player")}
              />
              <video
                className="w-full h-[140px] object-cover rounded-md top-0 z-[5] absolute"
                src={""}
                autoPlay
                loop
                onClick={() => (window.location.href = "/player")}
              />
            </div>
            <div className="info-container flex flex-col p-4 gap-2">
              <h3
                className="name"
                onClick={() => (window.location.href = "/player")}
              >
                {movieData.name ? movieData.name : movieData.original_title}
              </h3>
              <div className="icons flex justify-between">
                <div className="controls flex gap-4">
                  <IoPlayCircleSharp
                    className="text-2xl cursor-pointer transition-[0.3s] duration-300 ease-in-out hover:text-[#b8b8b8]"
                    title="play"
                    onClick={() => (window.location.href = "/player")}
                  />
                  <RiThumbUpFill
                    className="text-2xl cursor-pointer transition-[0.3s] duration-300 ease-in-out hover:text-[#b8b8b8]"
                    title="like"
                  />

                  <RiThumbDownFill
                    className="text-2xl cursor-pointer transition-[0.3s] duration-300 ease-in-out hover:text-[#b8b8b8]"
                    title="dislike"
                  />

                  {isLiked ? (
                    <button
                      onClick={() => {
                        dispatch(
                          removeFromLikedMovies({
                            email,
                            movieId: movieData.id,
                          })
                        );
                        toast.success("Movie deleted sucessfully", {
                          position: "top-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }}
                    >
                      <BsCheck
                        className="text-2xl font-bold cursor-pointer transition-[0.3s] duration-300 ease-in-out hover:text-[#b8b8b8]"
                        title="remove from list"
                      />
                    </button>
                  ) : (
                    <button onClick={addToList}>
                      <AiOutlinePlus
                        className="text-2xl cursor-pointer transition-[0.3s] duration-300 ease-in-out hover:text-[#b8b8b8]"
                        title="add to my list"
                      />
                    </button>
                  )}
                </div>
                <div className="info">
                  <BiChevronDown
                    title="more Info"
                    className="text-2xl cursor-pointer transition-[0.3s] duration-300 ease-in-out hover:text-[#b8b8b8]"
                    onClick={() => {
                      dispatch(setModelData(movieData));
                      dispatch(setModelState(true));
                    }}
                  />
                </div>
              </div>
              <div className="genre flex">
                {!show && (
                  <ul className="flex gap-4">
                    {movieData?.genres?.map((genre, index) => {
                      const listItemClasses = `pr-3 ${
                        index === 0 ? "list-none" : "list-disc"
                      }`;

                      return (
                        <li className={listItemClasses} key={genre}>
                          {genre}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Card;
