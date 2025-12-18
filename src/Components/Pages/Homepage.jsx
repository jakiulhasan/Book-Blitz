import React from "react";
import SwiperSlider from "../Slider/SwiperSlider";
import LatestBook from "../LatestBook/LatestBook";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SwiperSlider></SwiperSlider>
      <LatestBook> </LatestBook>
    </div>
  );
};

export default Homepage;
