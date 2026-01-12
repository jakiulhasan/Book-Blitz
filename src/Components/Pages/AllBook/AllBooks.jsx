import React, { useState, useEffect } from "react";
import BookCard from "./Components/BookCard";
import axiosInstance from "../../../Context/Axios/Axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const AllBooks = () => {
  const [price, setPrice] = useState(0);
  const [debouncedPrice, setDebouncedPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  // Debounce price to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPrice(price);
    }, 500);
    return () => clearTimeout(handler);
  }, [price]);

  const categories = [
    "Business",
    "Client-Server",
    "Computer Graphics",
    "Internet",
    "Java",
    "Microsoft",
    "Microsoft .NET",
    "Miscellaneous",
    "Mobile",
    "Mobile Technology",
    "Networking",
    "Next Generation Databases",
    "Object-Oriented Programming",
    "Open Source",
    "Perl",
    "PowerBuilder",
    "Programming",
    "Python",
    "Software Engineering",
    "Theory",
    "Web Development",
    "XML",
  ];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["books", debouncedPrice, selectedCategories, sortOrder],
    queryFn: async ({ pageParam = 0 }) => {
      // Map the UI state to the backend sort strings
      const sortMapping = {
        newest: "publishedDate:asc",
        oldest: "publishedDate:desc",
        priceLow: "price:asc",
        priceHigh: "price:desc",
      };

      const params = {
        skip: pageParam,
        limit: 12,
        sort: sortMapping[sortOrder] || "publishedDate:desc",
      };

      if (debouncedPrice > 0) params.maxPrice = debouncedPrice;
      if (selectedCategories.length > 0) {
        params.categories = selectedCategories.join(",");
      }

      const response = await axiosInstance.get("/books", { params });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextSkip || undefined,
    // Prevents UI flicker while fetching filtered results
    placeholderData: (previousData) => previousData,
  });

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const allBooks = data?.pages.flatMap((page) => page.books) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <span>Home</span> /{" "}
        <span className="font-semibold text-gray-900">All Books</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-6 space-y-8">
            {/* Categories Filter */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Categories</h3>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <ul className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {categories.map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      <span
                        className={`text-sm transition-colors ${
                          selectedCategories.includes(cat)
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600 group-hover:text-gray-900"
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm mt-2 text-gray-600 font-medium">
                <span>$0</span>
                <span>{price > 0 ? `Under $${price}` : "All Prices"}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {allBooks.length}
              </span>{" "}
              books
            </p>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-none bg-transparent font-medium focus:ring-0 cursor-pointer text-gray-900"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="oldest">Oldest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-100 animate-pulse rounded-xl"
                ></div>
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-20 text-red-500">
              Failed to load books. Please try again later.
            </div>
          )}

          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {/* Empty State */}
          {!isLoading && allBooks.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-gray-500 text-lg">
                No books found matching these filters.
              </p>
              <button
                onClick={() => {
                  setPrice(0);
                  setSelectedCategories([]);
                }}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          <div className="mt-12 flex flex-col items-center">
            {hasNextPage ? (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-10 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {isFetchingNextPage ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Load More Books"
                )}
              </button>
            ) : (
              allBooks.length > 0 && (
                <p className="text-gray-400 italic">
                  — You've viewed all available books —
                </p>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllBooks;
