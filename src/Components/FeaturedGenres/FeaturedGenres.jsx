import React from "react";
import { Sword, Ghost, Heart, Rocket } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // 1. Import motion

const FeaturedGenres = () => {
  const genres = [
    {
      name: "Fantasy",
      icon: <Sword size={32} />,
      count: "1.2k+ Books",
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Sci-Fi",
      icon: <Rocket size={32} />,
      count: "850+ Books",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Romance",
      icon: <Heart size={32} />,
      count: "2k+ Books",
      color: "bg-pink-100 text-pink-600",
    },
    {
      name: "Horror",
      icon: <Ghost size={32} />,
      count: "430+ Books",
      color: "bg-slate-100 text-slate-800",
    },
  ];

  // 2. Define Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Time between each card appearing
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* 3. Animate the Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Genres</h2>
        <p className="text-gray-500">
          Find your next favorite read in our curated categories.
        </p>
      </motion.div>

      {/* 4. Animate the Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the grid is visible
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {genres.map((genre, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-base-200"
          >
            <div className="card-body items-center text-center">
              <div
                className={`p-4 rounded-full mb-2 group-hover:scale-110 transition-transform ${genre.color}`}
              >
                {genre.icon}
              </div>
              <h3 className="card-title text-xl font-bold">{genre.name}</h3>
              <p className="text-sm opacity-70">{genre.count}</p>
              <div className="card-actions mt-2">
                <button className="btn btn-ghost btn-sm text-primary">
                  Browse All
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedGenres;
