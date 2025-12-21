import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Context/Axios/Axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { BookOpen, Calendar, User } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

const fetchLatestBooks = async () => {
  const res = await axiosInstance.get("/books?latest=true");
  // Logic: return the data directly if it's an array,
  // otherwise look for a property like 'books' or 'data' inside the response
  return Array.isArray(res.data)
    ? res.data
    : res.data.books || res.data.data || [];
};

const LatestBook = () => {
  const {
    data: books = [], // Default to empty array
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-books"],
    queryFn: fetchLatestBooks,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-10 w-48 bg-base-300 animate-pulse rounded mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-col gap-4 w-full">
              <div className="skeleton h-64 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle case where no books are found or error occurs
  if (isError || !Array.isArray(books) || books.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Latest Arrivals</h2>
          <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
        </div>
        <button className="btn btn-ghost btn-sm text-primary hidden sm:flex">
          View All Books
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={4}
        spaceBetween={25}
        loop={books.length > 4}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1.2, centeredSlides: true, spaceBetween: 15 },
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-14"
      >
        {books.map((book) => {
          const publishedYear = book?.publishedDate?.$date
            ? new Date(book.publishedDate.$date).getFullYear()
            : "N/A";

          return (
            <SwiperSlide key={book._id} className="h-auto">
              <motion.div
                variants={itemVariants}
                className="group card bg-base-100 border border-base-200 h-full hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <figure className="relative h-72 overflow-hidden">
                  <img
                    src={book.thumbnailUrl}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="btn btn-primary btn-sm rounded-full">
                      Quick View
                    </button>
                  </div>
                  {book.categories?.[0] && (
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-primary font-medium text-xs">
                        {book.categories[0]}
                      </span>
                    </div>
                  )}
                </figure>

                <div className="card-body p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                      {book.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-3 text-sm text-base-content/70">
                      <User size={14} className="text-primary" />
                      <span className="truncate">
                        {book.authors?.join(", ") || "Unknown Author"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-xs text-base-content/50">
                      <Calendar size={14} />
                      <span>Published: {publishedYear}</span>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                    <Link
                      to={`/books/${book.isbn}`}
                      className="btn btn-sm btn-outline btn-primary w-full group-hover:btn-active"
                    >
                      <BookOpen size={16} /> View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.section>
  );
};

export default LatestBook;
