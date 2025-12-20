import React, { useState } from "react";

const BookCard = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { title, authors, price, thumbnailUrl, longDescription, categories } =
    book;

  return (
    <>
      {/* --- Main Card --- */}
      <div className="group border border-gray-100 rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 bg-white">
        <div className="relative aspect-3/4 bg-gray-100 rounded-lg mb-4 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm hover:bg-gray-50"
          >
            Quick View
          </button>
        </div>

        <h4 className="font-bold text-gray-900 truncate" title={title}>
          {title}
        </h4>
        <p className="text-sm text-gray-500 mb-2">{authors?.join(", ")}</p>

        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold">${price}</span>
          <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

      {/* --- Quick View Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setShowFullDescription(false); // Reset when closing
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            <div className="w-full md:w-1/3 shrink-0">
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                {categories?.[0]}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{title}</h2>
              <p className="text-gray-600 mb-4 text-sm">
                by {authors?.join(", ")}
              </p>

              <h5 className="font-semibold text-gray-900 mb-2">Description</h5>

              {/* --- Line Clamp Logic --- */}
              <p
                className={`text-gray-600 text-sm leading-relaxed ${
                  !showFullDescription ? "line-clamp-5" : ""
                }`}
              >
                {longDescription || "No description available."}
              </p>

              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 text-sm font-semibold mt-1 hover:underline focus:outline-none"
              >
                {showFullDescription ? "Show Less" : "Show Details"}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Price
                  </p>
                  <span className="text-2xl font-bold text-gray-900">
                    ${price}
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
