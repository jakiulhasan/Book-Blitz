import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Link, Navigate, useNavigate } from "react-router";
import axiosInstance from "../../Context/Axios/Axios";
import { toast } from "react-hot-toast";

export default function Register() {
  const { setUser, user, createAccount, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // 1. Upload to ImgBB Logic
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Image upload to ImgBB failed.");

    const data = await res.json();
    return data.data.display_url;
  };

  // 2. Main Submit Handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    const imageFile = data.image[0];

    try {
      // Step A: Create Firebase Account
      await createAccount(data.email, data.password);

      // Step B: Upload Image
      const imageURL = await uploadImageToImgBB(imageFile);

      // Step C: Update Firebase Profile (DisplayName & Photo)
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageURL,
      });

      // Step D: Save User to MongoDB/Backend
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: imageURL,
        role: "user", // Default role
      };
      await axiosInstance.post("/add-user", userInfo);

      // SUCCESS HANDLING
      toast.success("Account created successfully! Welcome.");
      reset();
      setPreview(null);
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);

      // Handle Specific Firebase Errors
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        toast.error("The password is too weak.");
      } else {
        toast.error(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Image Preview Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label font-semibold">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`input input-bordered w-full ${
                  errors.name && "input-error"
                }`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-error text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label font-semibold">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className={`input input-bordered w-full ${
                  errors.email && "input-error"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-error text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${
                  errors.password && "input-error"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                    message: "Must include Uppercase, Lowercase, and Number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-error text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Image Upload Field */}
            <div className="form-control">
              <label className="label font-semibold">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("image", {
                  required: "Profile image is required",
                })}
                onChange={handleImageChange}
              />
              {errors.image && (
                <p className="text-error text-xs mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Image Preview Area */}
            {preview && (
              <div className="flex justify-center py-2">
                <div className="avatar">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={preview} alt="Avatar Preview" />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <div className="divider text-xs text-gray-400">OR</div>

          <p className="text-center">
            Already have an account?
            <Link
              to="/auth/login"
              className="text-primary font-bold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
