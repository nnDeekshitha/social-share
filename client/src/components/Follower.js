import React, { useState, useEffect } from "react";
import { fetchData } from "../main";

const Follower = () => {
  const [followers, setState] = useState([]);
  const userId = localStorage.getItem("userid") || null;
  useEffect(() => {
    if (userId) {
      fetchData_(userId);
    }
  }, [userId]);
  const fetchData_ = async (id) => {
    try {
      const res = await fetchData(`/follow/follower/${id}`, {}, "GET");
      setState(res);
    } catch (error) {}
  };
  return (
    <>
      <h4>Followers</h4>
      <ul className="list-group">
        {followers.map((follower) => (
          <li className="list-group-item" key={follower.id}>
            <div className="d-flex align-items-center">
              <img
                src={"https://dummyimage.com/50x50/000/fff"}
                alt={follower.user_name}
                className="avatar mx-2 rounded-circle"
              />
              <div className="flex-1">
                <span className="text-primary">{follower.username}</span>
                <br />
                <small className="text-black-50">@{follower.username}</small>
              </div>
              <div className="align-self-start">
                {follower?.isMutual ? (
                  <button className="btn py-0 px-3 btn-primary">Follow</button>
                ) : (
                  <button className="btn py-0 px-3 btn-secondary">
                    Following
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Follower;
