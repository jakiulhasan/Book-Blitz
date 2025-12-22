import { use, useEffect, useState } from "react";
import axiosInstance from "../../../Context/Axios/Axios";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const MyBooksTab = () => {
  const { user } = use(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/librarian/books?email=${user.email}`)
      .then((res) => setBooks(res.data));
  }, [user.email]);

  const handleUnpublish = async (id) => {
    await axiosInstance.patch(`/librarian/books/${id}`, {
      status: "UNPUBLISHED",
    });

    setBooks((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "UNPUBLISHED" } : b))
    );
  };
  const handlePublish = async (id) => {
    await axiosInstance.patch(`/librarian/books/${id}`, {
      status: "PUBLISHED",
    });

    setBooks((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "PUBLISHED" } : b))
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
                    <img
                      src={book.thumbnailUrl}
                      alt=""
                      className="w-12 rounded"
                    />
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
                    {book.status === "PUBLISHED" ? (
                      <button
                        onClick={() => {
                          handleUnpublish(book._id);
                        }}
                        className="btn btn-outline"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handlePublish(book._id);
                        }}
                        className="btn btn-outline"
                      >
                        Publish
                      </button>
                    )}
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
