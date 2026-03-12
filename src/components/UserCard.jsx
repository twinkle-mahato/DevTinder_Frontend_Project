import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ userFeed, isPreview = false }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  if (!userFeed) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = userFeed;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="my-10">
      <div className="card w-90 max-w-sm overflow-hidden border border-base-content/10 bg-base-100/30 backdrop-blur-xl shadow-2xl shadow-purple-500/10 h-full">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
            className=" w-full h-85 object-cover"
          />
        </figure>

        <div className="card-body gap-2 pt-3">
          <h2 className="card-title text-xl font-bold">
            {firstName + " " + lastName}
          </h2>

          {age && gender && (
            <p>
              {age} years <span>&#8226;</span> {gender}
            </p>
          )}

          <p className="text-base-content/60 text-sm line-clamp-2 wrap-break overflow-hidden">
            {about}
          </p>

          {!isPreview ? (
            <div className="card-actions justify-center gap-4 mt-3">
              <button
                className="btn btn-outline btn-error rounded-full px-8 hover:shadow-md hover:shadow-error/30"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                ✕ Ignore
              </button>
              <button
                className="btn rounded-full px-8 bg-linear-to-r from-violet-600 to-purple-500 border-0 text-white hover:from-violet-700 hover:to-purple-600 hover:shadow-md hover:shadow-purple-500/40"
                onClick={() => handleSendRequest("interested", _id)}
              >
                ♥ Interested
              </button>
            </div>
          ) : (
            <div className="card-actions justify-center mt-3">
              <div className="badge badge-outline badge-primary px-6 py-3 text-sm">
                👁️ Preview Mode
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="alert alert-error bg-error/10 border border-error/20 text-error w-96 py-2"
        >
          <span className="text-sm">⚠️ {error}</span>
        </div>
      )}
    </div>
  );
};

export default UserCard;
