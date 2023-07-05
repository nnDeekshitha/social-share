import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("loggedIn") || false;
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user_name");
    localStorage.removeItem("loggedIn");
    navigate("/", { replace: true });
  };
  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light mb-3 shadow-sm"
        style={{ position: "sticky", top: "0", zIndex: "1" }}
      >
        <Link className="navbar-brand mx-2" to="/">
          Social Share
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link onClick={handleLogout} to="/" className="nav-link">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
