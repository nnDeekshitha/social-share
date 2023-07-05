import React, { useState, useEffect } from "react";
import { fetchData } from "../main";

const Following = () => {
  const [followers, setState] = useState([]);
  const userId = localStorage.getItem("userid") || null;

  useEffect(() => {
    if (userId) {
      fetchData_(userId);
    }
  }, [userId]);

  const fetchData_ = async (id) => {
    try {
      const res = await fetchData(`/follow/following/${id}`, {}, "GET");
      setState(res);
    } catch (error) {}
  };

  const handleUnFollowUser = async (followerId) => {
    try {
      await fetchData(`/follow/remove/${userId}/${followerId}`, {}, "DELETE");
      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <h4>Following</h4>
      <ul className="list-group">
        {followers?.map((follower) => (
          <li className="list-group-item" key={follower.id}>
            <div className="d-flex align-items-center">
              <img
                src={"https://dummyimage.com/50x50/000/fff"}
                alt={follower.name}
                className="avatar mx-2 rounded-circle"
              />
              <div style={{ flex: "1" }}>
                <span className="text-primary">{follower.username}</span>
                <br />
                <small className="text-black-50">@{follower.username}</small>
              </div>
              <div className="align-self-start">
                <button
                  onClick={() => handleUnFollowUser(follower.id)}
                  className="btn py-0 px-3 btn-secondary btn-sm"
                >
                  Un Follow
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Following;
