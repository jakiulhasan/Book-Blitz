import { use, useEffect, useState } from "react";
import axiosInstance from "../../../Context/Axios/Axios";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import UpdateBookModal from "./UpdateBookModal"; // We will create this next

const MyBooksTab = () => {
  const { user } = use(AuthContext);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/librarian/books?email=${user.email}`)
        .then((res) => setBooks(res.data));
    }
  }, [user?.email]);

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

  // Function to refresh the list after update
  const onUpdateSuccess = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
    );
    setSelectedBook(null);
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
                        book.status === "PUBLISHED"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() =>
                        book.status === "PUBLISHED"
                          ? handleUnpublish(book._id)
                          : handlePublish(book._id)
                      }
                      className="btn btn-sm btn-outline mr-2"
                    >
                      {book.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                    </button>

                    {/* EDIT BUTTON */}
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Render */}
      {selectedBook && (
        <UpdateBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </div>
  );
};

export default MyBooksTab;
