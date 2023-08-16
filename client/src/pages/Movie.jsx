import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utilis/Firebase-config";
import SelectGenre from "../components/SelectGenre";
import Footer from "../components/Footer";
import Modal from "../components/Model";

const Movie = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const [down, setDown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movie" }));
    }
  }, [genresLoaded]);

  const arrow = () => {
    setIsScrolled(window.scrollY > 50 ? true : false);
    if (window.scrollY > 150) {
      setDown(true);
    }
    if (window.scrollY < 150) {
      setDown(false);
    }
    return () => (window.onscroll = null);
  };

  window.addEventListener("scroll", arrow);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });
  return (
    <div className="bg-black overflow-x-clip ">
      <div className="Navbar h-16">
        <Navbar isScrolled={isScrolled} down={down} />
      </div>
      <div className="data h-full mt-10 min-h-screen sm:mt-20">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
      <Modal />
      <Footer />
    </div>
  );
};

export default Movie;
