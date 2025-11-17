import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    // Fetch profile for the currently logged-in admin
    axios
      .get("http://localhost:3000/admin/profile", { withCredentials: true })
      .then((res) => {
        console.log("Response data:", res.data);
        setUser(res.data);
        setTempData(res.data);
      })
      .catch((err) => console.error("Error fetching admin profile:", err));
  }, []);

  if (!user) {
    return <div className="text-center mt-5">Loading admin data...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:3000/admin/profile", tempData, { withCredentials: true });
      console.log("Update response:", res.data);
      setUser(res.data);
      setTempData(res.data);
      setEditSection(null);
      alert("Admin profile updated successfully!");
    } catch (err) {
      console.error("Error updating admin profile:", err);
      alert("Failed to update admin profile.");
    }
  };

  const handleCancel = () => {
    setTempData(user);
    setEditSection(null);
  };

  return (
    <div className="container my-5">
      {/* Profile Header */}
      <div className="card shadow mb-4 text-center">
        <div className="card-body">
          <img
            src={user.photo}
            alt="Profile"
            className="rounded-circle border border-3 border-primary mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h3>
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-muted">@{user.username}</p>
        </div>
      </div>

      {/* Personal Info */}
      <Section
        title="Personal Information"
        color="primary"
        isEditing={editSection === "personal"}
        onEdit={() => setEditSection("personal")}
        onSave={handleSave}
        onCancel={handleCancel}
      >
        {renderPersonalInfo(tempData, handleChange, editSection === "personal")}
      </Section>
    </div>
  );
}

// ========== REUSABLE SECTION COMPONENT ==========
function Section({ title, color, isEditing, onEdit, onSave, onCancel, children }) {
  return (
    <div className="card shadow mb-4">
      <div className={`card-header bg-${color} text-white d-flex justify-content-between align-items-center`}>
        <span className="fw-bold">{title}</span>
        {!isEditing ? (
          <button className="btn btn-light btn-sm" onClick={onEdit}>
            Edit
          </button>
        ) : (
          <div>
            <button className="btn btn-light btn-sm me-2" onClick={onSave}>
              Save
            </button>
            <button className="btn btn-outline-light btn-sm" onClick={onCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="card-body row">{children}</div>
    </div>
  );
}

// ========== INFO RENDERERS ==========
function renderPersonalInfo(data, handleChange, editable) {
  return (
    <>
      <InputField label="Username" name="username" value={data.username} editable={editable} onChange={handleChange} />
      <InputField label="Email" name="email" value={data.email} editable={editable} onChange={handleChange} />
      <InputField label="Phone" name="phone" value={data.phone} editable={editable} onChange={handleChange} />
      <InputField label="First Name" name="first_name" value={data.first_name} editable={editable} onChange={handleChange} />
      <InputField label="Last Name" name="last_name" value={data.last_name} editable={editable} onChange={handleChange} />
      <InputField label="City of Birth" name="city_of_birth" value={data.city_of_birth} editable={editable} onChange={handleChange} />
      <InputField label="Date of Birth" name="date_of_birth" value={data.date_of_birth} editable={editable} onChange={handleChange} type="date" />
      <InputField
        label="Gender"
        name="gender"
        value={data.gender}
        editable={editable}
        onChange={handleChange}
        type="select"
        options={["Male", "Female"]}
      />
    </>
  );
}

// ========== INPUT FIELD COMPONENT ==========
function InputField({ label, name, value, editable, onChange, type = "text", options = [] }) {
  return (
    <div className="col-md-6 mb-3">
      <label className="form-label fw-semibold">{label}</label>
      {editable ? (
        type === "select" ? (
          <select
            name={name}
            value={value || ""}
            onChange={onChange}
            className="form-select"
          >
            {!value && <option value="">Select {label}</option>}
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            className="form-control"
          />
        )
      ) : (
        <div className="text-muted">{value || "-"}</div>
      )}
    </div>
  );
}
