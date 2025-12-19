import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Users, BookCheck, Globe, Trophy, ArrowRight } from "lucide-react";

import animationData from "../../assets/Book-loading.json";

const Membership = () => {
  const stats = [
    {
      label: "Readers",
      value: "50K+",
      icon: <Users size={20} className="text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      label: "Delivered",
      value: "1.2M+",
      icon: <BookCheck size={20} className="text-green-500" />,
      color: "bg-green-50",
    },
    {
      label: "Districts",
      value: "64",
      icon: <Globe size={20} className="text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      label: "Awards",
      value: "12",
      icon: <Trophy size={20} className="text-yellow-500" />,
      color: "bg-yellow-50",
    },
  ];

  return (
    <section className="py-12 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side: Scaled down Lottie */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12 w-full flex justify-center relative"
          >
            {/* Smaller background glow */}
            <div className="absolute w-48 h-48 bg-primary/10 rounded-full blur-2xl -z-10 animate-pulse"></div>

            <div className="w-full max-w-[320px]">
              {" "}
              {/* Reduced max-width */}
              <Lottie
                animationData={animationData}
                loop={true}
                className="drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="lg:w-6/12 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="badge badge-secondary badge-sm md:badge-md badge-outline mb-3 font-bold">
                OUR IMPACT
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                More Than Just a <br className="hidden md:block" />
                <span className="text-primary underline decoration-wavy decoration-1 underline-offset-4">
                  Bookstore.
                </span>
              </h2>
              <p className="text-base-content/70 text-base mb-6 max-w-lg">
                Building the largest community of book lovers. From cities to
                remote districts, BookBlitz delivers knowledge to your doorstep.
              </p>

              {/* Tighter Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 md:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className={`p-4 rounded-xl border border-base-200 shadow-sm ${stat.color} flex items-center gap-3 transition-all`}
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-slate-800 leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <button className="btn btn-primary btn-md rounded-full group px-8">
                  Join Us
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
