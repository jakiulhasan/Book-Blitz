import React, { useEffect, useState } from "react";
import axiosInstance from "../../Context/Axios/Axios";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Hash,
  Layers,
  ChevronLeft,
  ShoppingCart,
  Star,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/books/${isbn}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [isbn]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!book)
    return <div className="text-center py-20 font-medium">Book not found.</div>;

  const handleOrderNow = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-4 md:p-8"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Library</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image & Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={book.thumbnailUrl}
              alt={book.title}
              className="relative w-full rounded-2xl shadow-2xl border border-gray-100 object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <Layers className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Pages
                </p>
                <p className="font-semibold">{book.pageCount}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <Hash className="text-purple-500 w-5 h-5" />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  ISBN
                </p>
                <p className="font-semibold text-sm">
                  {book.isbn.slice(-5)}...
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {book.categories?.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
            {book.status === "PUBLISH" && (
              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Published
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {book.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-gray-500 font-medium">
              by{" "}
              <span className="text-gray-900">{book.authors?.join(", ")}</span>
            </p>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-bold text-gray-900">
              ${book.price}
            </span>
            <span className="text-gray-400 line-through text-lg">
              ${(book.price * 1.2).toFixed(2)}
            </span>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-500" />
                About this book
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-blue-100 pl-4 mb-4">
                {book.shortDescription}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {book.longDescription}
              </p>
            </div>

            <div
              onClick={handleOrderNow}
              className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-200 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Now
              </motion.button>

              <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl">
                <Calendar className="text-gray-400 w-5 h-5" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                    Release Date
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    {new Date(book.publishedDate).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "short" }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookDetails;
