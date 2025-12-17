import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosInstance from "../../Context/Axios/Axios";

const SwiperSlider = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sliderData"],
    queryFn: async () => {
      const res = await axiosInstance.get("/banner-slider");
      return res.data;
    },
  });

  if (isLoading) return null;
  if (isError) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop
      speed={500}
      pagination={{ clickable: true }}
      navigation
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      spaceBetween={20}
      slidesPerView={1}
      className="mySwiper"
    >
      {data.map((s) => (
        <SwiperSlide key={s._id}>
          <div className="relative h-100px w-full">
            {/* Background Image */}
            <img
              src={s.image}
              alt={s.alt}
              className="w-full h-full object-cover blur-[2px] brightness-30"
            />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                Master Your Book Career
              </h1>
              <p className="mb-4 text-sm md:text-lg">
                Join our course and take your writing & publishing skills to the
                next level!
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <button className="btn btn-primary btn-sm md:btn-md">
                  Enroll Now
                </button>
                <button className="btn btn-outline btn-sm md:btn-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
