import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // 1. Import motion
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

  // Animation variants for reusability
  const fadeDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isLoading)
    return <div className="h-87.5 md:h-125 w-full skeleton rounded-none"></div>;
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
        className="h-87.5 md:h-125 w-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s._id}>
            {/* The "active" slide logic is handled by Swiper, 
                but Framer Motion's initial/animate props will trigger on mount of the slide */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 z-0">
                <img
                  src={s.image}
                  alt={s.alt}
                  className="w-full h-full object-cover transform scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-left">
                {/* 2. Wrap content in a motion.div to coordinate children */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="max-w-xl space-y-4 md:space-y-6"
                >
                  <motion.div
                    variants={fadeDown}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-content text-xs font-bold uppercase tracking-widest"
                  >
                    <BookOpen size={14} /> New Arrival 2025
                  </motion.div>

                  <motion.h1
                    variants={fadeDown}
                    transition={{ delay: 0.2 }} // Staggered start
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
                  >
                    {s.title || "Master Your Book Career"}
                  </motion.h1>

                  <motion.p
                    variants={fadeDown}
                    transition={{ delay: 0.3 }}
                    className="text-gray-200 text-sm md:text-lg max-w-md opacity-90"
                  >
                    Join our industry-leading courses and take your writing &
                    publishing skills to the next level.
                  </motion.p>

                  <motion.div
                    variants={fadeDown}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-3 md:gap-4 pt-2"
                  >
                    <button className="btn btn-primary btn-sm md:btn-md rounded-lg px-6">
                      Enroll Now <ArrowRight size={18} />
                    </button>
                    <button className="btn btn-outline btn-sm md:btn-md rounded-lg text-white border-white hover:bg-white hover:text-black px-6">
                      View Details
                    </button>
                  </motion.div>
                </motion.div>
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
