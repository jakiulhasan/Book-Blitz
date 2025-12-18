import React from "react";
import { BookOpen, Sword, Ghost, Heart, Rocket, Library } from "lucide-react";

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

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Genres</h2>
        <p className="text-gray-500">
          Find your next favorite read in our curated categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {genres.map((genre, index) => (
          <div
            key={index}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGenres;
