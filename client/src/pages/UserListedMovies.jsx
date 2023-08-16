import React, { useEffect, useState } from "react";
import { getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../utilis/Firebase-config";
import Modal from "../components/Model";

const UserListedMovies = () => {
  const movies = useSelector((state) => state.netflix.LikedMovies);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else window.location.href = "/login";
  });

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
    // eslint-disable-next-line
  }, [email]);

  const arrow = () => {
    setIsScrolled(window.scrollY > 50 ? true : false);
    return () => (window.onscroll = null);
  };

  window.addEventListener("scroll", arrow);
  return (
    <div className="bg-black flex flex-col min-h-screen">
      <div className="Navbar h-12">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className=" content flex flex-col  items-start h-full ">
        <h1 className="text-3xl sm:text-4xl ml-4  text-white sm:ml-20 my-12 mt-16 font-semibold">
          My List
        </h1>
        <div className="flex ml-4 sm:ml-20  gap-4 flex-wrap h-full ">
          {movies?.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default UserListedMovies;
