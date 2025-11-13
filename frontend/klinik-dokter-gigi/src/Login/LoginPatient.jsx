import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/loginpatient", formData)
      .then(res => {
        console.log("Response:", res.data);
        if(res.data.Status === "Success"){
          navigate("/"); 
          alert("Login successful!");
        } else {
          alert("Login failed: " + (res.data.message || "Invalid credentials"));
        }
      })
      .catch(err => {
        console.error("Axios error:", err);
        alert("Login request failed!");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-4 rounded-3" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Log In Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              className="form-control rounded-0"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log In
          </button>
        </form>

        <p className="mt-3 text-center">
          Have no account?{" "}
          <a href="/register" className="text-decoration-none">
            Register
          </a>
        </p>
        <p className="mt-3 text-center">
        
          <a href="/logindoctor" className="text-decoration-none">
            Switch to doctor
          </a>
         
        </p>
        <p className="mt-3 text-center">
        
          <a href="/loginadmin" className="text-decoration-none">
            Switch to admin
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPatient;
