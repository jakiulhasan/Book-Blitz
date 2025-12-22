import { useEffect, useState } from "react";
import axiosInstance from "../../../Context/Axios/Axios";

const MyBooksTab = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/librarian/books?email=librarian@email.com")
      .then((res) => setBooks(res.data));
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";
    await axiosInstance.patch(`/librarian/books/${id}`, { status: newStatus });

    setBooks((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
    );
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body p-0">
        <div className="p-6 border-b">
          <h2 className="card-title text-xl">My Books</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50">
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => (
                <tr key={book._id} className="hover">
                  <td>{i + 1}</td>
                  <td>
                    <img src={book.image} alt="" className="w-12 rounded" />
                  </td>
                  <td className="font-medium">{book.title}</td>
                  <td>
                    <span
                      className={`badge ${
                        book.status === "published"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => toggleStatus(book._id, book.status)}
                      className="btn btn-xs btn-outline"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 opacity-50">
                    No books added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooksTab;
