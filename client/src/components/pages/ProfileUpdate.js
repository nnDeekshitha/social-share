import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../main";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const id = localStorage.getItem("userid") || null;

  useEffect(() => {
    if (id) {
      fetchData_(id);
    }
  }, [id]);
  const fetchData_ = async (id) => {
    try {
      const res = await fetchData(`/user/${id}`, {}, "GET");
      setData(res);
    } catch (error) {}
  };
  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("loggedIn");
    navigate("/", { replace: true });
  };
  const handleUpdate = async () => {
    try {
      await fetchData(`/user/${id}`, data, "PUT");
      navigate(0);
    } catch (error) {}
  };

  const handleRemoveAccount = async () => {
    try {
      await fetchData(`/user/${id}`, {}, "DELETE");
      handleLogout();
    } catch (error) {}
  };

  return (
    <>
      <h3>Profile Update</h3>
      <div className="row">
        <div className="col-12 col-md-8 col-xl-6 mx-auto">
          <div className="card" style={{ width: "300px" }}>
            <img
              src="https://dummyimage.com/120x120/000/fff" // Replace with the URL or source of the user's avatar image
              alt="User Avatar"
              className="card-img-top rounded-circle mt-3 mx-auto"
              style={{ width: "100px", height: "100px" }}
            />
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  value={data?.user_name}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      user_name: e.target.value,
                    }))
                  }
                  type="text"
                  id="username"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  value={data?.email}
                  type="email"
                  id="email"
                  className="form-control"
                  disabled
                />
              </div>
              <button className="btn btn-primary me-2" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-danger" onClick={handleRemoveAccount}>
                Remove Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
