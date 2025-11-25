import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import profilePic from "../assets/kazu.jpg";

export default function PatientProfile() {
  const { id } = useParams();
  const [user, setPatient] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [tempData, setTempData] = useState({});

  useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/patient/${id}`)
  //     .then((res) => {
  //       console.log("Response data:", res.data);
  //       setPatient(res.data);
  //       setTempData(res.data);
  //     })
  //     .catch((err) => console.error("Error fetching patient:", err));
  // }, [id]);

  // if (!user) {
  //   return <div className="text-center mt-5">Loading patient data...</div>;
  // }

    if (!id) return;
    
    axios
      .get(`http://localhost:3000/patient/${id}`)
      .then((res) => setPatient(res.data))
      .catch((err) => console.error("Error fetching patient", err));
  }, [id]);

  if (!user) return <p>Loading Patient Data...</p>

  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  // handle save (for now just updates state)
  const handleSave = async () => {
    try{
      const res = await axios.put(`http://localhost:3000/patient/${id}`, tempData, { withCredentials: true });
      console.log("Update response:", res.data);
      setPatient(res.data);
      setTempData(res.data);
      setEditSection(null);

      alert("Patient profile updated successfully!");
    }
    catch(err){
      console.error("Error updating patient:", err);
      alert("Failed to update patient profile.");
    }
  };

  const handleCancel = () => {
    setTempData(user);
    setEditSection(null);
  };

  // SIDEBAR
  const [open, setOpen] = useState(true);

  return (
    <div className="d-flex vh-100 w-100" style={{backgroundColor: "#F2F5FC"}}>
      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "" : "closed"}`} style={{backgroundColor: "#5463A4"}}>
        <a href={`/patient/${id}`}>Profile</a>
        <a href={`/appointment/${id}`}>Appointments</a>
        <a href="">Doctors</a>
      </div>

      {/* TOPBAR */}

      {/* PICTURE THING */}
      <div>
        {/* img */}
        <div>
          <img 
            src={profilePic} 
            alt="profile pic" 
            className="rounded-circle border border-3 border-primary mb-3"
          />

          <h5>{user.first_name} {user.last_name}</h5>
        </div>
        

      </div>
      
      {/* PERSONAL INFORMATION */}
      {/* MEDICAL INFORMATION */}
      {/* EMERGENCY CONTACT */}
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

function renderMedicalInfo(data, handleChange, editable) {
  return (
    <>
      <InputField
        label="Blood Type"
        name="blood_type"
        value={data.blood_type}
        editable={editable}
        onChange={handleChange}
        type="select"
        options={["A", "B", "AB", "O"]}
      />
      <InputField label="Height (cm)" name="height_cm" value={data.height_cm} editable={editable} onChange={handleChange} />
      <InputField label="Weight (kg)" name="weight_kg" value={data.weight_kg} editable={editable} onChange={handleChange} />
      <InputField label="Condition" name="condition" value={data.condition} editable={editable} onChange={handleChange} />
    </>
  );
}

function renderEmergencyInfo(data, handleChange, editable) {
  return (
    <>
      <InputField
        label="Emergency Contact Name"
        name="emergency_contact_name"
        value={data.emergency_contact_name}
        editable={editable}
        onChange={handleChange}
      />
      <InputField
        label="Emergency Contact Number"
        name="emergency_contact_number"
        value={data.emergency_contact_number}
        editable={editable}
        onChange={handleChange}
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
            value={value || ""}  // ✅ keeps the current value from API or state
            onChange={onChange}
            className="form-select"
          >
            {/* ✅ only show placeholder if value is empty */}
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

