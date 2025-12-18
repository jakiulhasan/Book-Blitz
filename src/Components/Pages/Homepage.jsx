import React from "react";
import SwiperSlider from "../Slider/SwiperSlider";
import LatestBook from "../LatestBook/LatestBook";
import Coverage from "../Coverage/Coverage";
import WhyChooseBookBlitz from "../WhyChooseBookBlitz/WhyChooseBookBlitz";
import FeaturedGenres from "../FeaturedGenres/FeaturedGenres";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SwiperSlider></SwiperSlider>
      <LatestBook> </LatestBook>
      <Coverage></Coverage>
      <WhyChooseBookBlitz></WhyChooseBookBlitz>
      <FeaturedGenres></FeaturedGenres>
    </div>
  );
};

export default Homepage;
