import axios from "axios";
import axiosInstance from "../../../Context/Axios/Axios";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const AddBookTab = () => {
  const { user } = use(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imageFile = form.image.files[0];

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB}`,
        formData
      );

      const imageUrl = imgbbResponse.data.data.display_url;

      const date = new Date(form.publishedDate.value);
      const formattedDate = date.toISOString().replace("Z", "+00:00");
      const book = {
        title: form.title.value,
        isbn: form.isbn.value,
        pageCount: Number(form.pageCount.value),
        publishedDate: formattedDate,
        thumbnailUrl: imageUrl,
        shortDescription: form.shortDescription.value,
        longDescription: form.longDescription.value,
        status: form.status.value,
        authors: form.authors.value.split(",").map((a) => a.trim()),
        categories: form.categories.value.split(",").map((c) => c.trim()),
        price: parseFloat(form.price.value),
        librarianEmail: user.email,
      };

      console.log(book);

      await axiosInstance.post("/librarian/books", book);

      form.reset();
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to upload image or save book.");
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4">Add New Book</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Title */}
          <input
            name="title"
            placeholder="Book Title"
            className="input input-bordered w-full"
            required
          />

          {/* ISBN */}
          <input
            name="isbn"
            placeholder="ISBN Number"
            className="input input-bordered w-full"
            required
          />

          {/* Authors (Comma separated) */}
          <input
            name="authors"
            placeholder="Authors (e.g. John Doe, Jane Doe)"
            className="input input-bordered w-full"
            required
          />

          {/* Categories (Comma separated) */}
          <input
            name="categories"
            placeholder="Categories (e.g. Java, Web)"
            className="input input-bordered w-full"
            required
          />

          {/* Page Count */}
          <input
            name="pageCount"
            type="number"
            placeholder="Page Count"
            className="input input-bordered w-full"
            required
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />

          {/* Published Date */}
          <input
            name="publishedDate"
            type="date"
            className="input input-bordered w-full"
            required
          />

          {/* Status */}
          <select name="status" className="select select-bordered w-full">
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="UNPUBLISH">UNPUBLISH</option>
          </select>

          {/* Image Upload */}
          <div className="form-control md:col-span-2">
            <label className="label text-xs font-bold">Book Cover Image</label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              required
            />
          </div>

          {/* Short Description */}
          <textarea
            name="shortDescription"
            placeholder="Short Description"
            className="textarea w-full textarea-bordered md:col-span-2"
            rows="2"
            required
          ></textarea>

          {/* Long Description */}
          <textarea
            name="longDescription"
            placeholder="Long Description"
            className="textarea w-full textarea-bordered md:col-span-2"
            rows="4"
            required
          ></textarea>

          <button className="btn btn-primary md:col-span-2 mt-4">
            Add Book to Database
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookTab;
