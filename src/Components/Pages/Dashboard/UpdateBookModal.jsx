import React from "react";
import axiosInstance from "../../../Context/Axios/Axios";

const UpdateBookModal = ({ book, onClose, onUpdateSuccess }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      title: form.title.value,
      isbn: form.isbn.value,
      pageCount: Number(form.pageCount.value),
      thumbnailUrl: form.thumbnailUrl.value,
      status: form.status.value,
      authors: form.authors.value.split(",").map((a) => a.trim()),
      categories: form.categories.value.split(",").map((c) => c.trim()),
      price: parseFloat(form.price.value),
    };

    try {
      const res = await axiosInstance.put(
        `/librarian/books/${book._id}`,
        updatedData
      );
      if (res.data) {
        onUpdateSuccess(res.data); // Update UI in parent
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Edit Book: {book.title}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Title</label>
            <input
              name="title"
              defaultValue={book.title}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">ISBN</label>
            <input
              name="isbn"
              defaultValue={book.isbn}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={book.price}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Page Count</label>
            <input
              name="pageCount"
              type="number"
              defaultValue={book.pageCount}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">Thumbnail URL</label>
            <input
              name="thumbnailUrl"
              defaultValue={book.thumbnailUrl}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">Authors (comma separated)</label>
            <input
              name="authors"
              defaultValue={book.authors?.join(", ")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">Categories (comma separated)</label>
            <input
              name="categories"
              defaultValue={book.categories?.join(", ")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">Status</label>
            <select
              name="status"
              defaultValue={book.status}
              className="select select-bordered w-full"
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="UNPUBLISHED">UNPUBLISHED</option>
            </select>
          </div>
          <div className="form-control col-span-2">
            <label className="label">Short Description</label>
            <textarea
              name="shortDescription"
              defaultValue={book.shortDescription}
              className="textarea textarea-bordered h-20"
            ></textarea>
          </div>

          <div className="modal-action col-span-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
