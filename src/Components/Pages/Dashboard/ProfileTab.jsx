import React, { useState, useEffect, use, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import axiosInstance from "../../../Context/Axios/Axios";

export const ProfileTab = () => {
  const { user, updateUserProfile } = use(AuthContext);
  const fileInputRef = useRef(null);

  // 1. Local state for form and UI
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Keep state in sync with context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  // 2. ImgBB Upload Logic
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageFormData = new FormData();
      imageFormData.append("image", file);

      // Upload to ImgBB
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB}`,
        {
          method: "POST",
          body: imageFormData,
        }
      );
      const data = await res.json();
      const newImageUrl = data.data.display_url;

      // Update local state immediately for preview
      setFormData((prev) => ({ ...prev, photoURL: newImageUrl }));
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  // 3. Save Profile Changes
  const handleSave = async () => {
    try {
      setIsUpdating(true);

      // Update Firebase Profile
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 max-w-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-xl mb-6">Profile Information</h2>

        {/* AVATAR SECTION */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center z-10">
                  <Loader2 className="animate-spin text-white" />
                </div>
              )}
              <img
                src={formData.photoURL || "https://via.placeholder.com/150"}
                alt="Avatar"
              />
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            disabled={uploadingImage}
            className="btn btn-outline btn-sm gap-2"
          >
            <Camera size={14} />
            {uploadingImage ? "Uploading..." : "Change Photo"}
          </button>
        </div>

        {/* FORM SECTION */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold">Display Name</label>
            <br />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input w-full input-bordered focus:input-primary"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <br />
            <input
              type="text"
              value={user?.email || ""}
              className="input w-full input-bordered opacity-60 cursor-not-allowed"
              readOnly
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isUpdating || uploadingImage || !formData.name?.trim()}
            className="btn btn-primary w-full mt-4"
          >
            {isUpdating ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
