import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Context/Axios/Axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const fetchLatestBooks = async () => {
  const res = await axiosInstance.get("/books?latest=true");
  return res.data;
};

const LatestBook = () => {
  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-books"],
    queryFn: fetchLatestBooks,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading latest books...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load latest books
      </div>
    );
  }

  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-6">Latest Books</h2>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={4}
        spaceBetween={20}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {books.map((book) => {
          const publishedYear = book?.publishedDate?.$date
            ? new Date(book.publishedDate.$date).getFullYear()
            : "N/A";

          return (
            <SwiperSlide key={book._id}>
              <div className="card bg-base-100 shadow-md h-full">
                <figure className="h-48">
                  <img
                    src={book.thumbnailUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </figure>

                <div className="card-body p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-1">
                    {book.authors?.join(", ") || "Unknown Author"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Published: {publishedYear}
                  </p>

                  {book.categories?.length > 0 && (
                    <div className="mt-2">
                      <span className="badge badge-outline badge-sm">
                        {book.categories[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LatestBook;
