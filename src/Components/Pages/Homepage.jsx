import React from "react";
import SwiperSlider from "../Slider/SwiperSlider";
import LatestBook from "../LatestBook/LatestBook";
import Coverage from "../Coverage/Coverage";
import WhyChooseBookBlitz from "../WhyChooseBookBlitz/WhyChooseBookBlitz";
import FeaturedGenres from "../FeaturedGenres/FeaturedGenres";
import ReaderTestimonials from "../ReaderTestimonials/ReaderTestimonials";
import Membership from "../Membership/Membership";
import Newsletter from "./HomeComponent/Newsletter";
import FAQ from "./HomeComponent/FAQ";
import BlogSection from "./HomeComponent/BlogSection";
import FeaturedAuthors from "./HomeComponent/FeaturedAuthors";
import Statistics from "./HomeComponent/Statistics";

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-20">
      <SwiperSlider />
      <LatestBook />
      <Statistics />
      <Membership />
      <FeaturedGenres />
      <Coverage />
      <WhyChooseBookBlitz />
      <FeaturedAuthors />
      <ReaderTestimonials />
      <BlogSection />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Homepage;
