import React, { useState, useEffect } from "react";
import { fetchData } from "../main";

const Users = () => {
  const [following, setFollowing] = useState([]);
  const [users, setState] = useState([]);
  const userId = localStorage.getItem("userid") || null;
  useEffect(() => {
    if (userId) {
      fetchAllUsers(userId);
    }
  }, [userId]); // eslint-disable-line

  const fetchData_ = async (id) => {
    try {
      const res = await fetchData(`/follow/following/${id}`, {}, "GET");
      setFollowing(res);
    } catch (error) {}
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetchData("/user/all", {}, "GET");
      setState(
        res
          .filter((ele) => ele._id !== userId)
          .map((user) => ({ username: user.user_name, id: user._id }))
      );
      fetchData_(userId);
    } catch (error) {}
  };

  const handleFollowRequest = async (id) => {
    try {
      await fetchData(
        `/follow/new`,
        {
          follower: userId,
          following: id,
        },
        "POST"
      );
      window.location.reload(true);
    } catch (error) {}
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10 col-xl-8 mx-auto">
          <h4>Users</h4>
          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item" key={user.id}>
                <div className="d-flex align-items-center">
                  <img
                    src={"https://dummyimage.com/50x50/000/fff"}
                    alt={user.username}
                    className="avatar mx-2 rounded-circle"
                  />
                  <div className="flex-1">
                    <span className="text-primary">{user.username}</span>
                    <br />
                    <small className="text-black-50">@{user.username}</small>
                  </div>
                  <div className="align-self-start">
                    {following?.map((ele) => ele.id).includes(user.id) ? (
                      <button className="btn py-0 px-3 btn-secondary">
                        Following
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollowRequest(user.id)}
                        className="btn py-0 px-3 btn-primary"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Users;
