import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Link, Navigate, useNavigate } from "react-router";
import axiosInstance from "../../Context/Axios/Axios";

export default function Register() {
  const { setUser, user, createAccount, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ImgBB upload
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
    setUser({ photoURL: data.data.display_url });
    return data.data.display_url;
  };

  // Submit handler
  const onSubmit = (data) => {
    setIsLoading(true);

    const imageFile = data.image[0];

    createAccount(data.email, data.password)
      .then(() => {
        // upload image
        return uploadImageToImgBB(imageFile);
      })
      .then((imageURL) => {
        // save user in database
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: imageURL,
        };

        return axiosInstance.post("/add-user", userInfo).then(() => imageURL);
      })
      .then((imageURL) => {
        // update firebase profile
        return updateUserProfile({
          displayName: data.name,
          photoURL: imageURL,
        });
      })
      .then(() => {
        reset();
        setPreview(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              <label className="label">Name</label>
              <input
                type="text"
                className={`input input-bordered ${
                  errors.name && "input-error"
                }`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                className={`input input-bordered ${
                  errors.email && "input-error"
                }`}
                {...register("email", { required: "Email is required" })}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">Password</label>
              <input
                type="password"
                className={`input input-bordered ${
                  errors.password && "input-error"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: 8,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).+$/,
                })}
              />
            </div>

            {/* Image */}
            <div className="form-control">
              <label className="label">Profile Image</label>
              <input
                type="file"
                className="file-input file-input-bordered"
                {...register("image", { required: true })}
                onChange={handleImageChange}
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-full"
                />
              </div>
            )}

            <button className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?
            <Link to="/auth/login" className="text-red-500 ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
