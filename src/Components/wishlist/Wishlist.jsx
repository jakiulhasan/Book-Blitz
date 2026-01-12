import React, { useState } from "react";

const initialWishlist = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    image: "https://covers.openlibrary.org/b/id/9641983-L.jpg",
  },
  {
    id: 2,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    image: "https://covers.openlibrary.org/b/id/10523338-L.jpg",
  },
];

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover rounded-xl mb-4"
              />

              <div className="flex-1">
                <h2 className="text-lg font-medium">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.author}</p>
              </div>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-4 w-full py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
