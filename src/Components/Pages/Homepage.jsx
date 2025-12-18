import React from "react";
import SwiperSlider from "../Slider/SwiperSlider";
import LatestBook from "../LatestBook/LatestBook";
import Coverage from "../Coverage/Coverage";
import WhyChooseBookBlitz from "../WhyChooseBookBlitz/WhyChooseBookBlitz";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SwiperSlider></SwiperSlider>
      <LatestBook> </LatestBook>
      <Coverage></Coverage>
      <WhyChooseBookBlitz></WhyChooseBookBlitz>
    </div>
  );
};

export default Homepage;
