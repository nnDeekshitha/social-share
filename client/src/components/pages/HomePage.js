import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to the Social Share</h1>
        <div>
          <p className="description">
            Connect with friends, share photos, and more!
          </p>
          <Link to="/register" className="btn btn-primary cta-button">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
