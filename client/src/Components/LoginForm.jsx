import React, { useState } from "react";
import axiosInstance from "./AxiosInterceptor";

const LoginForm = ({ show, handleClose, onLoginSuccess }) => {
  if (!show) return null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/users/login", formData);
      console.log("Success:", response.data);

      const { data, token } = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);

      onLoginSuccess(data);

      handleClose();
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-login">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button id="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
