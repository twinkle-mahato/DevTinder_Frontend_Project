import axios from "axios";
import React, { useEffect, useState } from "react";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {
      console.log("Error:", err);
      setError(err.response?.data?.message || "Failed to load connections!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Loading
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // Error
  if (error)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="alert alert-error bg-error/10 border border-error/20 text-error w-96">
          <span>⚠️ {error}</span>
        </div>
      </div>
    );

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center mt-40">
        <div className="card border border-base-content/10 bg-base-100/30 backdrop-blur-xl shadow-2xl shadow-purple-500/10 p-8 text-center w-96">
          <div className="text-6xl mb-4 animate-bounce">😔</div>
          <h2 className="text-xl font-bold">No Connections Yet!</h2>
          <p className="text-base-content/50 mt-2 text-sm">
            You haven't connected with anyone yet. Start swiping to find your
            dev match! 🚀
          </p>
          <div className="divider text-xs text-base-content/30">
            GET STARTED
          </div>
          <button
            className="btn bg-linear-to-r from-violet-600 to-purple-500 border-0 text-white hover:from-violet-700 hover:to-purple-600 btn-wide mx-auto"
            onClick={() => (window.location.href = "/")}
          >
            🔍 Find Developers
          </button>
        </div>
      </div>
    );

  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        🤝 Connections
        <span className="badge badge-primary ml-3 text-sm">
          {connections.length}
        </span>
      </h1>

      <div className="flex flex-col items-center gap-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={_id}
              className="flex items-center p-4 rounded-2xl border border-base-content/10 bg-base-100/10 backdrop-blur-xl shadow-lg shadow-purple-500/10 w-full max-w-3xl gap-4"
            >
              {/* Avatar */}
              <div className="avatar">
                <div className="w-16 h-16 rounded-full ring ring-purple-500/90 ring-offset-3 ring-offset-base-100">
                  <img alt="photo" src={photoUrl} />
                </div>
              </div>

              {/* Info */}
              <div className="text-left flex-1">
                <h2 className="font-semibold text-lg">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-base-content/50 text-sm">
                    {age} years, {gender}
                  </p>
                )}
                <p className="text-base-content/60 text-sm line-clamp-2">
                  {about}
                </p>
              </div>

              {/* Badge */}
              <div className="badge badge-outline badge-primary text-xs">
                Connected
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
