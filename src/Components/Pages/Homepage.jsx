import React from "react";
import SwiperSlider from "../Slider/SwiperSlider";
import LatestBook from "../LatestBook/LatestBook";
import Coverage from "../Coverage/Coverage";
import WhyChooseBookBlitz from "../WhyChooseBookBlitz/WhyChooseBookBlitz";
import FeaturedGenres from "../FeaturedGenres/FeaturedGenres";
import ReaderTestimonials from "../ReaderTestimonials/ReaderTestimonials";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SwiperSlider></SwiperSlider>
      <LatestBook> </LatestBook>
      <FeaturedGenres></FeaturedGenres>
      <Coverage></Coverage>
      <WhyChooseBookBlitz></WhyChooseBookBlitz>
      <ReaderTestimonials></ReaderTestimonials>
    </div>
  );
};

export default Homepage;
