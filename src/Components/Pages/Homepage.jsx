import React from "react";
import SwiperSlider from "../Slider/SwiperSlider";
import LatestBook from "../LatestBook/LatestBook";
import Coverage from "../Coverage/Coverage";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SwiperSlider></SwiperSlider>
      <LatestBook> </LatestBook>
      <Coverage></Coverage>
    </div>
  );
};

export default Homepage;
