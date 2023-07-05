import React, { useEffect, useState } from "react";
import { fetchData } from "../../main";
import { Link } from "react-router-dom";
const ProfileInfo = () => {
  const [user, setUser] = useState({
    user_name: "username",
    email: "useremail",
    avatar: "https://dummyimage.com/60x60/000/fff",
    followers: 100,
    following: 200,
    postCount: 120,
  });
  const userId = localStorage.getItem("userid") || null;
  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
      fetchActivityData(userId);
    }
  }, [userId]);
  const fetchUserData = async (id) => {
    try {
      const res = await fetchData(`/user/${id}`, {}, "GET");
      setUser((prevState) => ({ ...prevState, ...res }));
    } catch (error) {}
  };
  const fetchActivityData = async (id) => {
    try {
      const res = await fetchData(`/api/${id}/count`, {}, "GET");
      setUser((prevState) => ({ ...prevState, ...res }));
    } catch (error) {}
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-body p-2">
          <div className="row">
            <div className="col-3 text-center mx-auto mt-2 ">
              <img
                src={user.avatar}
                alt="Avatar"
                className="mr-2 rounded-circle"
              />
            </div>
            <div className="col-9">
              <div className="text-primary ">
                <strong>@{user.user_name}</strong>
              </div>
              <div className="text-black-50">{user.email}</div>
              <div className="row mt-3">
                <div className="col-4 text-center">
                  <h6 className="m-0 text-center">{user.postCount}</h6>
                  <small className="text-body-tertiary ">posts</small>
                </div>
                <div className="col-4 text-center">
                  <h6 className="m-0 text-center">{user.followerCount}</h6>
                  <small className="text-body-tertiary">Followers</small>
                </div>
                <div className="col-4 text-center">
                  <h6 className="m-0 text-center">{user.followingCount}</h6>
                  <small className="text-body-tertiary">Following</small>
                </div>
              </div>
              <Link to="/profile" className="custom-link">
                <button className="w-100 btn btn-primary py-0 mt-1">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Link to="/profile/feed" className="custom-link">
        <div className="text-body-tertiary p-1 mt-2 d-flex align-items-center">
          <i className="fa fa-th-large" aria-hidden="true"></i>
          <span className="mx-2">Feed</span>
        </div>
      </Link>
      <Link to="/profile/new" className="custom-link">
        <div className="text-body-tertiary p-1 mt-2 d-flex align-items-center">
          <i className="fa fa-plus-square" aria-hidden="true"></i>
          <span className="mx-2"> New Post</span>
        </div>
      </Link>
      <Link to="/profile/my-post" className="custom-link">
        <div className="text-body-tertiary p-1 mt-2 d-flex align-items-center">
          <i className="fa fa-image" aria-hidden="true"></i>
          <span className="mx-2">My Post</span>
        </div>
      </Link>
      <Link to="/profile" className="custom-link">
        <div className="text-body-tertiary p-1 mt-2 d-flex align-items-center">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <span className="mx-2">Profile</span>
        </div>
      </Link>
      <Link to="/profile/follow" className="custom-link">
        <div className="text-body-tertiary p-1 mt-2 d-flex align-items-center">
          <i className="fa fa-link" aria-hidden="true"></i>
          <span className="mx-2">Friends</span>
        </div>
      </Link>
      <Link to="/profile/search" className="custom-link">
        <div className="text-body-tertiary p-1 mt-2 d-flex align-items-center">
          <i className="fa fa-users" aria-hidden="true"></i>
          <span className="mx-2">Users</span>
        </div>
      </Link>
      <div className="text-body-tertiary p-1 mt-2 d-flex align-items-center">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <span className="mx-2">Logout</span>
      </div>
    </>
  );
};

export default ProfileInfo;
