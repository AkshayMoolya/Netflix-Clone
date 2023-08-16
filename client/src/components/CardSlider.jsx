import React, { useRef, useState } from "react";
import Card from "./Card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  AiOutlineAccountBook,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const CardSlider = React.memo(({ title, data }) => {

  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div className="w-">
      <div
        className="flex flex-col gap-4  py-8 px-0 text-white relative overflow-x-clip"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <h1 className="sm:text-3xl text-lg font-semibold ml-8 sm:ml-12 ">
          {title}
        </h1>
        <div className="wrapper">
          <div
            className={`slider-action left ${
              !showControls ? "hidden" : ""
            } flex justify-center items-center absolute z-50 h-full top-0 bottom-0 w-12 transition duration-300 ease-in-out left-0`}
          >
            <AiOutlineLeft
              className="text-3xl cursor-pointer"
              onClick={() => handleDirection("left")}
            />
          </div>
          <div
            className="flex w-max gap-4 translate-x-0 transition duration-300 ease-in-out ml-4 sm:ml-12 "
            ref={listRef}
          >
            {data.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
            })}
          </div>

          <div
            className={`slider-action right ${
              !showControls ? "hidden" : ""
            } flex justify-center items-center absolute z-50 h-full top-0 bottom-0 w-12 transition duration-300 ease-in-out right-0`}
          >
            <AiOutlineRight
              className="text-3xl cursor-pointer"
              onClick={() => handleDirection("right")}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CardSlider;
