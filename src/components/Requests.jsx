import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(
        "Review request failed:",
        err?.response?.data || err.message,
      );
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(
        "Fetch requests failed:",
        err?.response?.data || err.message,
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex justify-center items-center mt-40">
        <div className="card border border-base-content/10 bg-base-100/30 backdrop-blur-xl shadow-2xl shadow-purple-500/10 p-8 text-center w-96">
          <div className="text-5xl mb-10">📭</div>
          <h2 className="text-xl font-semibold">No Connection Requests</h2>
          <p className="text-base-content/50 mt-2 text-sm">
            When someone sends you a request, it will appear here.
          </p>
        </div>
      </div>
    );

  return (
    <div className=" text-center my-10 px-4">
      <h1 className="text-3xl font-bold mb-8"> 🤝 Connection Requests</h1>

      <div className="flex flex-col items-center gap-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="flex justify-between items-center p-4 rounded-2xl border border-base-content/10 bg-base-100/30 backdrop-blur-xl shadow-lg shadow-purple-500/10 w-full max-w-2xl gap-4"
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

              {/* Buttons */}
              <div className="flex flex-row gap-2">
                <button
                  className="btn btn-outline btn-error btn-sm rounded-full px-6"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  ✕ Reject
                </button>
                <button
                  className="btn btn-sm rounded-full px-6 bg-linear-to-r from-violet-600 to-purple-500 border-0 text-white hover:from-violet-700 hover:to-purple-600"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  ✓ Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Requests;
