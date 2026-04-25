import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUserHook";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import toast from "react-hot-toast";
import { completeOnboard } from "../utils/api";
import { LANGUAGES } from "../constant/constData";

function OnboardPage() {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [formStateData, setformStateData] = useState({
    name: authUser?.name || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profileImage: authUser?.profileImage || "",
  });

  const { mutate: onboradMutation, isPending } = useMutation({
    mutationFn: completeOnboard,
    onSuccess: () => {
      toast.success("profile created Succesfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

 const handleRandomAvatar = () => {
  const randomSeed = Math.random().toString(36).substring(2, 10);

  const avatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${randomSeed}&backgroundColor=ffdfbf,ffd5dc,caffbf`;

  setformStateData((prev) => ({
    ...prev,
    profileImage: avatarUrl, // ✅ store URL
  }));
};
  const handleSubmit = (e) => {
    e.preventDefault();
    onboradMutation(formStateData);
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-6"
      data-theme="pastel"
    >
      <div className="w-full max-w-2xl bg-base-100 rounded-2xl shadow-xl p-6 md:p-10 space-y-6">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Complete Your Profile
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl">
            {formStateData.profileImage ? (
              <img
                src={formStateData.profileImage}
                alt="avatar"
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          <button
            onClick={handleRandomAvatar}
            className="btn btn-accent btn-sm"
          >
            Generate Random Avatar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Beth Doe"
              value={formStateData.name}
              onChange={(e) =>
                setformStateData({ ...formStateData, name: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              value={formStateData.bio}
              onChange={(e) =>
                setformStateData({ ...formStateData, bio: e.target.value })
              }
              placeholder="Tell others about yourself..."
              className="textarea textarea-bordered w-full"
              rows={3}
            ></textarea>
          </div>

          {/* Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Native Language</span>
              </label>
              <select
                name="nativeLanguage"
                value={formStateData.nativeLanguage}
                onChange={(e) =>
                  setformStateData({
                    ...formStateData,
                    nativeLanguage: e.target.value,
                  })
                }
                className="select select-bordered w-full"
              >
                <option>Select your native language</option>

                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Learning Language</span>
              </label>
              <select
                value={formStateData.learningLanguage}
                onChange={(e) =>
                  setformStateData({
                    ...formStateData,
                    learningLanguage: e.target.value,
                  })
                }
                className="select select-bordered w-full"
              >
                <option>Select language you're learning</option>

                {LANGUAGES.map((lang) => (
                  <option key={`leatn-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              value={formStateData.location}
              onChange={(e) =>
                setformStateData({
                  ...formStateData,
                  location: e.target.value,
                })
              }
              placeholder="City, Country"
              className="input input-bordered w-full"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-success w-full mt-2"
          >
            {!isPending ? "submit from" : "Loading......."}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardPage;
