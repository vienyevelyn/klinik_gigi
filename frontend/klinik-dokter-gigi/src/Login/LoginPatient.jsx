import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function LoginPatient() {
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // ✅ get setAuth from AuthContext
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Login request
      const resLogin = await axios.post(
        "http://localhost:3000/loginpatient",
        formData,
        { withCredentials: true } // important for cookies
      );

      if (resLogin.data.Status === "Success") {
        // 2️⃣ Fetch user info (to get username + role)
        const resAuth = await axios.get("http://localhost:3000/", {
          withCredentials: true,
        });

        if (resAuth.data.Status === "Success") {
          // 3️⃣ Update AuthContext
          setAuth({
            isAuthed: true,
            username: resAuth.data.username,
            role: resAuth.data.role, // make sure backend sends role
            loading: false,
          });

          // 4️⃣ Navigate safely to protected route
          navigate("/patient/doctorschedule");
          alert("Login successful!");
        } else {
          alert("Failed to fetch user info!");
        }
      } else {
        alert("Login failed: " + (resLogin.data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login request failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-4 rounded-3" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Log In Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
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
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label>
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
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
  );
}

export default LoginPatient;
