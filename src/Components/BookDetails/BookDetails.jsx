import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
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
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../../Context/Axios/Axios";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import useRole from "../../hooks/useRole";

const BookDetails = () => {
  const { user } = use(AuthContext);
  const { isbn } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(`/books/${isbn}`);
        setBook(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [isbn]);

  const handleOrderNow = async () => {
    if (!user) {
      const loginNav = await Swal.fire({
        title: "Login Required",
        text: "Please sign in to purchase this book.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#2563eb",
      });
      if (loginNav.isConfirmed) navigate("/auth/login");
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Purchase",
      text: `Order "${book.title}" for $${book.price}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Place Order",
    });

    if (result.isConfirmed) {
      try {
        setIsOrdering(true);

        const orderPayload = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "Anonymous",
          bookId: book._id,
          isbn: book.isbn,
          title: book.title,
          price: book.price,
          quantity: 1,
          totalAmount: book.price,
          status: "pending",
          orderDate: new Date().toISOString(),
        };

        const response = await axiosInstance.post("/orders", orderPayload);

        if (response.status === 200 || response.status === 201) {
          await Swal.fire({
            title: "Order Placed!",
            text: "Your order has been recorded successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate(`/${role}/dashboard`);
        }
      } catch (error) {
        Swal.fire({
          title: "Order Failed",
          text:
            error.response?.data?.message ||
            "There was an issue processing your order.",
          icon: "error",
        });
      } finally {
        setIsOrdering(false);
      }
    }
  };

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

  if (!book) {
    return (
      <div className="text-center py-20 font-medium">
        <h2 className="text-2xl">Book not found.</h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 underline mt-4"
        >
          Return Home
        </button>
      </div>
    );
  }

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
        {/* Left Column: Image & Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
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
                <p className="font-semibold">{book.pageCount || "N/A"}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <Hash className="text-purple-500 w-5 h-5" />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  ISBN
                </p>
                <p className="font-semibold text-sm">
                  {book.isbn?.slice(-5)}...
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
                <BookOpen className="w-5 h-5 text-blue-500" /> About this book
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-blue-100 pl-4 mb-4">
                {book.shortDescription}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {book.longDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: isOrdering ? 1 : 1.02 }}
                whileTap={{ scale: isOrdering ? 1 : 0.98 }}
                onClick={handleOrderNow}
                disabled={isOrdering}
                className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-200 transition-all ${
                  isOrdering ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isOrdering ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
                {isOrdering ? "Processing Order..." : "Order Now"}
              </motion.button>

              <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl">
                <Calendar className="text-gray-400 w-5 h-5" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                    Release Date
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    {book.publishedDate
                      ? new Date(book.publishedDate).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short" }
                        )
                      : "N/A"}
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
