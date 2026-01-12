import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import axiosInstance from "../../Context/Axios/Axios";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const STORAGE_KEY = "requestBookForm";
const REDIRECT_KEY = "redirectAfterLogin";

const RequestBook = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  /* ---------------- Restore saved form data ---------------- */
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  /* ---------------- Persist form data on change ---------------- */
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  /* ---------------- Submit Handler ---------------- */
  const onSubmit = async (formData) => {
    if (!user?.email) {
      // Save redirect path
      localStorage.setItem(REDIRECT_KEY, location.pathname);
      navigate("/auth/login");
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const { data } = await axiosInstance.post("/request-book", {
        email: user.email,
        ...formData,
      });

      setFeedback({
        type: "success",
        message: data?.message || "Book request submitted successfully.",
      });

      // Cleanup after success
      localStorage.removeItem(STORAGE_KEY);
      reset();
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err.response?.data?.message ||
          "Failed to submit request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto my-12 px-4">
      <div className="bg-base-100 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Request a Book</h1>
          <p className="text-base-content/60 mt-2">
            Can’t find the book you’re looking for? Submit a request and we’ll
            review it.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Title */}
            <div className="form-control">
              <label className="label font-medium">
                <span className="label-text">Book Title</span>
              </label>
              <input
                type="text"
                placeholder="The Great Gatsby"
                className={`input input-bordered ${
                  errors.bookTitle ? "input-error" : ""
                }`}
                {...register("bookTitle", {
                  required: "Book title is required",
                })}
              />
              {errors.bookTitle && (
                <p className="text-error text-sm mt-1">
                  {errors.bookTitle.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div className="form-control">
              <label className="label font-medium">
                <span className="label-text">Author Name</span>
              </label>
              <input
                type="text"
                placeholder="F. Scott Fitzgerald"
                className={`input input-bordered ${
                  errors.bookAuthor ? "input-error" : ""
                }`}
                {...register("bookAuthor", {
                  required: "Author name is required",
                })}
              />
              {errors.bookAuthor && (
                <p className="text-error text-sm mt-1">
                  {errors.bookAuthor.message}
                </p>
              )}
            </div>
          </div>

          {/* ISBN */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">ISBN (optional)</span>
            </label>
            <input
              type="text"
              placeholder="978-3-16-148410-0"
              className="input input-bordered flex"
              {...register("bookIsbn")}
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`alert ${
                feedback.type === "success" ? "alert-success" : "alert-error"
              }`}
            >
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`btn btn-primary px-10 ${
                loading || isSubmitting ? "loading" : ""
              }`}
              disabled={loading || isSubmitting}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RequestBook;
