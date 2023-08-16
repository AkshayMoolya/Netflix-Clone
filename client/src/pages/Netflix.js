import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Modal from "../components/Model";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const [down, setDown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    func();
    // eslint-disable-next-line
  }, [genresLoaded]);

  const func = () => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  };

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
  return (
    <div className="bg-black overflow-x-clip relative">
      <Navbar isScrolled={isScrolled} down={down} />
      <Banner />
      <Slider movies={movies} />
      <Modal />
      <Footer />
    </div>
  );
};

export default Netflix;
