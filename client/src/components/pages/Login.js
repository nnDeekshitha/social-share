import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../main";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isLoggedIn = localStorage.getItem("loggedIn") || false;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile", {
        replace: true,
      });
    }
  }, [isLoggedIn]); // eslint-disable-line

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform email and password validation
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      setErrorMessage("Invalid email or password.");
      return;
    }
    const data = {
      user_name: email,
      password: password,
    };
    try {
      const res = await fetchData("/user/login", data, "POST");
      console.log(res);
      localStorage.setItem("user_name", res?.user?.user_name);
      localStorage.setItem("userid", res?.user?.id);
      localStorage.setItem("loggedIn", true);
      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      setErrorMessage(error?.msg);
    }
  };

  const validateEmail = (email) => {
    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  return (
    <div>
      <div className="container">
        <div className="grid">
          <div className="col-12 col-md-6 col-xl-4 mx-auto">
            <div className="card mt-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Login</h3>

                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
