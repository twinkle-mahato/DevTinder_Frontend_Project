import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      if (err.status === 400) {
        setError(err.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center mt-24">
        <div className="alert alert-error w-96">
          <span>⚠️ {error}</span>
        </div>
      </div>
    );

  if (!feed) return;

  // No users state ✅ directly added here
  if (feed.length <= 0)
    return (
      <div className="flex justify-center mt-24">
        <div className="card bg-base-100 shadow-2xl w-96 text-center border border-primary/20">
          <div className="card-body items-center gap-4 py-12">
            <div className="text-7xl animate-bounce">🛸</div>
            <h1 className="card-title text-3xl font-black">
              No Developers Found!
            </h1>
            <p className="text-base-content/50 text-sm px-4">
              You've swiped through everyone. Come back later for more! 🚀
            </p>
            <div className="divider text-xs text-base-content/30 w-full">
              CHECK BACK LATER
            </div>
            <button
              className="btn btn-primary btn-wide"
              onClick={() => window.location.reload()}
            >
              🔄 Refresh Feed
            </button>
          </div>
        </div>
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard userFeed={feed[0]} />
      </div>
    )
  );
};

export default Feed;
