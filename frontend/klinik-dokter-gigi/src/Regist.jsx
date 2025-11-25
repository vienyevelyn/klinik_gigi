import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Regist() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nik: '',
    first_name: '',
    last_name: '',
    city_of_birth: '',
    date_of_birth: '',
    gender: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/register", formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
      .then(res => {
        if (res.data.Status === "Success") {
          alert("Registration successful!");
          navigate("/loginpatient");
        } else {
          alert(res.data.message || "Registration error");
        }
        setFormData({
          nik: '',
          first_name: '',
          last_name: '',
          city_of_birth: '',
          date_of_birth: '',
          gender: '',
          username: '',
          phone: '',
          email: '',
          password: '',
          confirm_password: ''
        });
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || "Registration failed!");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100 overflow-auto">
      <div className="bg-white p-4 rounded-3" style={{ width: "500px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>

          {/* NIK */}
          <div className="mb-3">
            <label><strong>NIK</strong></label>
            <input type="text" name="nik" placeholder="Enter NIK" className="form-control rounded-0"
              value={formData.nik} onChange={handleChange} required />
          </div>

          {/* First Name */}
          <div className="mb-3">
            <label><strong>First Name</strong></label>
            <input type="text" name="first_name" placeholder="Enter First Name" className="form-control rounded-0"
              value={formData.first_name} onChange={handleChange} required />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label><strong>Last Name</strong></label>
            <input type="text" name="last_name" placeholder="Enter Last Name" className="form-control rounded-0"
              value={formData.last_name} onChange={handleChange} />
          </div>

          {/* City of Birth */}
          <div className="mb-3">
            <label><strong>City of Birth</strong></label>
            <input type="text" name="city_of_birth" placeholder="Enter City of Birth" className="form-control rounded-0"
              value={formData.city_of_birth} onChange={handleChange} required />
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label><strong>Date of Birth</strong></label>
            <input type="date" name="date_of_birth" className="form-control rounded-0"
              value={formData.date_of_birth} onChange={handleChange} required />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label><strong>Gender</strong></label>
            <select name="gender" className="form-control rounded-0"
              value={formData.gender} onChange={handleChange} required>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Username */}
          <div className="mb-3">
            <label><strong>Username</strong></label>
            <input type="text" name="username" placeholder="Enter username" className="form-control rounded-0"
              value={formData.username} onChange={handleChange} required />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label><strong>Phone</strong></label>
            <input type="text" name="phone" placeholder="Enter phone number" className="form-control rounded-0"
              value={formData.phone} onChange={handleChange} required />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input type="email" name="email" placeholder="Enter email" className="form-control rounded-0"
              value={formData.email} onChange={handleChange} required />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label><strong>Password</strong></label>
            <input type="password" name="password" placeholder="Enter password" className="form-control rounded-0"
              value={formData.password} onChange={handleChange} required />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label><strong>Confirm Password</strong></label>
            <input type="password" name="confirm_password" placeholder="Confirm password" className="form-control rounded-0"
              value={formData.confirm_password} onChange={handleChange} required />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <a href="/loginpatient" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Regist;
