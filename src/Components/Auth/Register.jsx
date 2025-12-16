import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Link, Navigate } from "react-router";

export default function Register() {
  const { user, createAccount, updateUserProfile } = use(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ImgBB upload function
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

    const data = await res.json();
    return data.data.display_url;
  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Create user
      const result = await createAccount(data.email, data.password);

      if (result.user) {
        // Upload image
        const imageURL = await uploadImageToImgBB(data.image[0]);

        // Update profile
        await updateUserProfile({
          displayName: data.name,
          photoURL: imageURL,
        });

        reset();
        setPreview(null);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <br />
              <input
                type="text"
                placeholder="Your name"
                className={`input w-full input-bordered ${
                  errors.name && "input-error"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-error text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <br />
              <input
                type="email"
                placeholder="email@example.com"
                className={`input  w-full input-bordered ${
                  errors.email && "input-error"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-error text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <br />
              <input
                type="password"
                placeholder="Strong password"
                className={`input  w-full input-bordered ${
                  errors.password && "input-error"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/,
                    message:
                      "Uppercase, lowercase, number & special character required",
                  },
                })}
              />
              {errors.password && (
                <p className="text-error text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className={`file-input w-full file-input-bordered ${
                  errors.image && "file-input-error"
                }`}
                {...register("image", {
                  required: "Profile image is required",
                })}
                onChange={handleImageChange}
              />
              {errors.image && (
                <p className="text-error text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Preview */}
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover ring ring-primary ring-offset-2"
                />
              </div>
            )}

            {/* Submit */}
            <button className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-5">
            <span>
              Already have an account?
              <Link to="/auth/login" className="ml-2 text-red-500">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
