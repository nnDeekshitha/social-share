import React from "react";
import { Outlet } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

const Feed = () => {
  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="row">
        <div className="col-lg-4">
          <div style={{ position: "sticky", top: "4.5rem" }}>
            <ProfileInfo />
          </div>
        </div>
        <div className="col-lg-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Feed;
