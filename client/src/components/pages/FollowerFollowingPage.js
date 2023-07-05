import React from "react";
import Follower from "../Follower";
import Following from "../Following";

const FollowerFollowingPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Follower />
        </div>
        <div className="col-md-6">
          <Following />
        </div>
      </div>
    </div>
  );
};

export default FollowerFollowingPage;
