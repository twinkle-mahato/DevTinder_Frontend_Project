import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      setTimeout(() => {
        setError("");
        // reset all fields back to original user data
        setFirstName(user?.firstName);
        setLastName(user?.lastName);
        setPhotoUrl(user?.photoUrl);
        setAge(user?.age || "");
        setGender(user?.gender || "");
        setAbout(user?.about);
      }, 2000);
    }
  };

  const inputClass =
    "input w-full max-w-xs bg-white/5 border border-white/15 focus:outline-none focus:border-purple-400 overflow-hidden";

  return (
    <>
      <div className="flex justify-center items-center gap-10 my-15 ">
        {/* Edit Card */}
        <div className="card w-96 overflow-hidden border border-base-content/10 bg-base-100/30 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
          <h1 className="text-xl font-semibold text-center mt-5">
            ✏️ Edit Profile
          </h1>

          <div className="card-body gap-1">
            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text my-1">
                  First Name <span className="text-error">*</span>
                </span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                className={inputClass}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text my-1">
                  Last Name <span className="text-error">*</span>
                </span>
              </div>
              <input
                type="text"
                value={lastName}   
                placeholder="Last Name"
                className={inputClass}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text my-1">
                  Photo URL <span className="text-error">*</span>
                </span>
              </div>
              <input
                type="text"
                value={photoUrl}
                placeholder="Photo URL"
                className={inputClass}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text my-1">
                  Age <span className="text-error">*</span>
                </span>
              </div>
              <input
                type="text"
                value={age}
                placeholder="Age"
                className={inputClass}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text my-1">
                  Gender <span className="text-error">*</span>
                </span>
              </div>
              <div className="dropdown dropdown-start w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="input w-full max-w-xs bg-white/5 border border-white/15 flex items-center justify-between cursor-pointer px-4 focus:outline-none"
                >
                  <span className={gender ? "" : "text-base-content/40"}>
                    {gender || "Select Gender"}
                  </span>
                  <span>⬇️</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-200 rounded-box z-10 w-full p-2 shadow-md border border-white/10"
                >
                  {["male", "female", "other"].map((g) => (
                    <li key={g}>
                      <a
                        onClick={() => {
                          setGender(g);
                          document.activeElement.blur();
                        }}
                        className="capitalize"
                      >
                        {g}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </label>

            <label className="form-control w-full max-w-xs m-2">
              <div className="label">
                <span className="label-text my-1">
                  About <span className="text-error">*</span>
                </span>
              </div>
              <textarea
                value={about}
                placeholder="About"
                className="textarea w-full max-w-xs bg-white/5 border border-white/15 focus:outline-none focus:border-purple-400"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            {error && (
              <div
                role="alert"
                className="alert alert-error my-2  bg-error/10 border border-error/20 text-error py-2 text-sm"
              >
                ⚠️ {error}
              </div>
            )}

            <div className="text-center  mt-2">
              <button
                className="btn w-full bg-linear-to-r from-violet-600 to-purple-500 border-0 text-white hover:from-violet-700 rounded-full  hover:to-purple-600"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <UserCard
          userFeed={{ firstName, lastName, photoUrl, age, gender, about }}
          isPreview={true}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-success/50 border border-success/30 text-success">
            <span>✅ Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
