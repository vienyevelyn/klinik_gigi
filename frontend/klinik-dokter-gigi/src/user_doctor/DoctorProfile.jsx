import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorProfile() {
  const [user, setUser] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [tempData, setTempData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // fetch doctor profile
    axios.get("http://localhost:3000/doctor/profile", { withCredentials: true })
      .then(res => {
        setUser(res.data);
        setTempData(res.data);
      })
      .catch(err => console.error(err));

    // fetch doctor categories
    axios.get("http://localhost:3000/doctor/categories", { withCredentials: true })
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if the field is doctor_category, find the corresponding ID
    if (name === "doctor_category_name") {
      const selected = categories.find(c => c.name === value);
      setTempData(prev => ({
        ...prev,
        doctor_category_name: value,
        id_doctor_category: selected?.id_doctor_category || null
      }));
    } else {
      setTempData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:3000/doctor/profile", tempData, { withCredentials: true });
      setUser(res.data);
      setTempData(res.data);
      setEditSection(null);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      {/* Profile Header */}
      <div className="card shadow mb-4 text-center">
        <div className="card-body">
          <img src={user.photo} alt="Profile" className="rounded-circle border border-3 border-primary mb-3" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
          <h3>{user.first_name} {user.last_name}</h3>
          <p className="text-muted">@{user.username}</p>
        </div>
      </div>

      {/* Personal Info Section */}
      <Section
        title="Personal Info"
        color="primary"
        isEditing={editSection === "personal"}
        onEdit={() => setEditSection("personal")}
        onSave={handleSave}
        onCancel={() => setEditSection(null)}
      >
        <InputField label="Username" name="username" value={tempData.username} editable={editSection === "personal"} onChange={handleChange} />
        <InputField label="Email" name="email" value={tempData.email} editable={editSection === "personal"} onChange={handleChange} />
        <InputField label="Phone" name="phone" value={tempData.phone} editable={editSection === "personal"} onChange={handleChange} />
        <InputField label="First Name" name="first_name" value={tempData.first_name} editable={editSection === "personal"} onChange={handleChange} />
        <InputField label="Last Name" name="last_name" value={tempData.last_name} editable={editSection === "personal"} onChange={handleChange} />
      </Section>

      {/* Doctor Info Section */}
      <Section
        title="Doctor Info"
        color="success"
        isEditing={editSection === "doctor"}
        onEdit={() => setEditSection("doctor")}
        onSave={handleSave}
        onCancel={() => setEditSection(null)}
      >
        <InputField
          label="Doctor Category"
          name="doctor_category_name"
          value={tempData.doctor_category_name || ""}
          editable={editSection === "doctor"}
          onChange={handleChange}
          type="select"
          options={categories.map(c => c.name)} // show names only
        />
        <InputField label="Medical License" name="medical_license" value={tempData.medical_license} editable={editSection === "doctor"} onChange={handleChange} />
        <InputField label="Certificate Degree" name="certificate_degree" value={tempData.certificate_degree} editable={editSection === "doctor"} onChange={handleChange} />
        <InputField label="Specialization Certificate" name="specialization_certificate" value={tempData.specialization_certificate} editable={editSection === "doctor"} onChange={handleChange} />
      </Section>
    </div>
  );
}

// Section component
function Section({ title, color, isEditing, onEdit, onSave, onCancel, children }) {
  return (
    <div className="card shadow mb-4">
      <div className={`card-header bg-${color} text-white d-flex justify-content-between align-items-center`}>
        <span className="fw-bold">{title}</span>
        {!isEditing ? (
          <button className="btn btn-light btn-sm" onClick={onEdit}>Edit</button>
        ) : (
          <div>
            <button className="btn btn-light btn-sm me-2" onClick={onSave}>Save</button>
            <button className="btn btn-outline-light btn-sm" onClick={onCancel}>Cancel</button>
          </div>
        )}
      </div>
      <div className="card-body row">{children}</div>
    </div>
  );
}

// InputField component
function InputField({ label, name, value, editable, onChange, type = "text", options = [] }) {
  return (
    <div className="col-md-6 mb-3">
      <label className="form-label fw-semibold">{label}</label>
      {editable ? (
        type === "select" ? (
          <select name={name} value={value} onChange={onChange} className="form-select">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input type={type} name={name} value={value || ""} onChange={onChange} className="form-control" />
        )
      ) : (
        <div className="text-muted">{value || "-"}</div>
      )}
    </div>
  );
}
