import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import axiosInstance from "../../Context/Axios/Axios";

const SwiperSlider = () => {
  const {
    data: slides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sliderData"],
    queryFn: async () => {
      const res = await axiosInstance.get("/banner-slider");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="h-[350px] md:h-[500px] w-full skeleton rounded-none"></div>
    );
  if (isError) return null;

  return (
    <section className="relative group overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={slides.length > 1}
        speed={1000}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        className="h-[350px] md:h-[500px] w-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s._id}>
            <div className="relative w-full h-full">
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <img
                  src={s.image}
                  alt={s.alt}
                  className="w-full h-full object-cover transform scale-105" // Slight scale for a "full" look
                />
                {/* Gradient Overlays for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-left">
                <div className="max-w-xl space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-content text-xs font-bold uppercase tracking-widest animate-pulse">
                    <BookOpen size={14} /> New Arrival 2025
                  </div>

                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                    {s.title || "Master Your Book Career"}
                  </h1>

                  <p className="text-gray-200 text-sm md:text-lg max-w-md opacity-90">
                    Join our industry-leading courses and take your writing &
                    publishing skills to the next level.
                  </p>

                  <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                    <button className="btn btn-primary btn-sm md:btn-md rounded-lg px-6">
                      Enroll Now <ArrowRight size={18} />
                    </button>
                    <button className="btn btn-outline btn-sm md:btn-md rounded-lg text-white border-white hover:bg-white hover:text-black px-6">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modern Swiper Navigation Styling */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.2);
          width: 44px !important;
          height: 44px !important;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          opacity: 0;
          transition: all 0.4s ease;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: oklch(var(--p)) !important;
          opacity: 1;
          width: 20px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </section>
  );
};

export default SwiperSlider;
