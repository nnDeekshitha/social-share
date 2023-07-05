import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../main";
import { validateEmail, validatePassword } from "../../utils";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Perform email and password validation
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      setErrorMessage("Invalid email or password.");
      return;
    }
    const data = {
      user_name: username,
      password: password,
      email: email,
    };
    try {
      await fetchData("/user/register", data, "POST");
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      setErrorMessage(error?.msg);
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="col-12 col-md-6 col-xl-4 mx-auto">
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
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
                <div className="text-center d-block">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
