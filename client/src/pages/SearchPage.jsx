import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Model from "../components/Model";
import Card from "../components/Card";
import { BsCheckLg } from "react-icons/bs";

const SearchPage = () => {
  const [down, setDown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [data, setData] = useState({});

  const { SearchTerm } = useParams();



  useEffect(() => {
    fetchdata();
  }, [SearchTerm]);

  const fetchdata = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${SearchTerm}&page=1&include_adult=false`
    );
    setData(data);
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

  if (data.status !== 200) {
    return (
      <>
        <Navbar isScrolled={isScrolled} down={down} />
        <div className=" bg-black flex justify-center items-center h-screen w-screen">
          <div className=" text-xl flex space-x-2 items-center text-white">
            <AiOutlineLoading3Quarters className=" animate-spin" />
            <p>Loading</p>
          </div>
        </div>
      </>
    );
  }
  if (data.data.total_results === 0) {
    return (
      <div className=" bg-black">
        <Navbar isScrolled={isScrolled} down={down} />
        <div className=" h-screen w-screen text-white  flex justify-center items-center">
          <div className=" px-10 text-xl font-medium">
            No results found for{" "}
            <span className=" underline">{SearchTerm}</span> are you sure you
            typed it correctly?
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black text-white relative">
      <div className=" bg-black">
        <div className=" overflow-x-hidden bg-black min-h-screen">
          <Navbar isScrolled={isScrolled} down={down} />
          <div className=" text-white text-xl md:text-2xl pt-36 pb-5 sm:pt-24 pl-8 sm:pl-12 sm:py-10">
            Search results for {SearchTerm} :
          </div>
          <div className=" justify-center gap-5 flex flex-wrap ">
            {data &&
              data?.data?.results.map((item, index) => {
                return <Card movieData={item} key={index} />;
              })}
          </div>
        </div>
      </div>
      <Model />
      <Footer />
    </div>
  );
};

export default SearchPage;
