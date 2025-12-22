import React, { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Eye, EyeOff, Trash2, ArrowUpDown } from "lucide-react";

const AdminAllBook = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextSkip, setNextSkip] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // New State for Sorting
  const [sortOrder, setSortOrder] = useState("publishedDate:asc");

  // Use useCallback to prevent unnecessary re-renders
  const fetchBooks = useCallback(
    async (skipValue, isLoadMore, currentSort) => {
      try {
        if (isLoadMore) setIsFetchingMore(true);
        else setLoading(true);

        // We include the sort parameter in the query string
        const res = await axiosSecure.get(
          `/books?skip=${skipValue}&limit=10&sort=${currentSort}`
        );

        if (isLoadMore) {
          setBooks((prev) => [...prev, ...res.data.books]);
        } else {
          setBooks(res.data.books);
        }

        setNextSkip(res.data.nextSkip);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [axiosSecure]
  );

  const handlePublish = async (currentStatus, bookId) => {
    const newStatus = currentStatus === "PUBLISH" ? "UNPUBLISH" : "PUBLISH";
    try {
      const res = await axiosSecure.patch(`/books/${bookId}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId ? { ...book, status: newStatus } : book
          )
        );
      }
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  const handleRemove = async (bookId) => {
    console.log({ bookId });
    try {
      const res = await axiosSecure.delete(`/books/${bookId}`);
      if (res.data.deletedCount > 0) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Initial Load and Load on Sort Change
  useEffect(() => {
    fetchBooks(0, false, sortOrder);
  }, [sortOrder, fetchBooks]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    // The useEffect will trigger fetchBooks(0, false, newSort)
  };

  const handleLoadMore = () => {
    if (nextSkip !== null) {
      fetchBooks(nextSkip, true, sortOrder);
    }
  };

  return (
    <div className="">
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="card-title text-2xl">
              Book Inventory Control ({books.length})
            </h2>

            {/* Sorting Dropdown */}
            <div className="form-control w-full max-w-xs">
              <div className="input-group flex items-center gap-2 border rounded-lg px-3 bg-base-200">
                <ArrowUpDown size={18} className="text-gray-500" />
                <select
                  className="select select-ghost focus:bg-transparent w-full focus:outline-none"
                  value={sortOrder}
                  onChange={handleSortChange}
                >
                  <option value="publishedDate:asc">Newest First</option>
                  <option value="publishedDate:desc">Oldest First</option>
                  <option value="price:asc">Price: Low to High</option>
                  <option value="price:desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading && !isFetchingMore ? (
              <div className="p-10 text-center text-xl">Loading...</div>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Librarian Email</th>
                    <th>Authors</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>
                      <td className="font-bold">{book.title}</td>
                      <td>{book.librarianEmail}</td>
                      <td>{book.authors?.join(", ")}</td>
                      <td>${book.price}</td>
                      <td>
                        <span
                          className={`badge ${
                            book.status === "PUBLISH"
                              ? "badge-success"
                              : "badge-warning"
                          } badge-outline`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handlePublish(book.status, book._id)}
                            className="btn btn-sm btn-ghost"
                          >
                            {book.status === "PUBLISH" ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => handleRemove(book._id)}
                            className="btn btn-sm btn-error btn-square"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {nextSkip !== null && !loading && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                disabled={isFetchingMore}
                className={`btn btn-primary btn-wide ${
                  isFetchingMore ? "loading" : ""
                }`}
              >
                {isFetchingMore ? "Loading..." : "Load More Books"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAllBook;
