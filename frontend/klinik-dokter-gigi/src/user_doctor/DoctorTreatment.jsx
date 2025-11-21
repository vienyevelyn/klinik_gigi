import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DoctorTreatmentPage() {
  const { id_record } = useParams(); // Get record ID from URL
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [treatments, setTreatments] = useState([
    { medicine: "", dosage: "", notes: "" }
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch medical record data
  const fetchRecord = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/doctor/record/${id_record}`, {
        withCredentials: true
      });
      setRecord(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [id_record]);

  // Add new empty treatment row
  const addTreatment = () => {
    setTreatments([...treatments, { medicine: "", dosage: "", notes: "" }]);
  };

  // Remove a treatment row
  const removeTreatment = (index) => {
    const newTreatments = [...treatments];
    newTreatments.splice(index, 1);
    setTreatments(newTreatments);
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const newTreatments = [...treatments];
    newTreatments[index][field] = value;
    setTreatments(newTreatments);
  };

  // Submit treatments to backend
  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:3000/doctor/record/${id_record}/treatment`,
        { treatments },
        { withCredentials: true }
      );
      alert("Treatments saved successfully!");
      navigate("/doctor/records"); // Back to records page
    } catch (err) {
      console.log(err);
      alert("Failed to save treatments");
    }
  };

  if (loading) return <p>Loading record...</p>;

  return (
    <div className="container p-5">
      <h2 className="text-xl font-bold mb-4">Add Treatments for Record #{id_record}</h2>

      <p><strong>Patient:</strong> {record?.first_name} {record?.last_name}</p>
      <p><strong>Diagnosis:</strong> {record?.diagnosis}</p>

      <hr className="my-4" />

      {treatments.map((t, index) => (
        <div key={index} className="mb-3 border p-3 rounded">
          <div className="mb-2">
            <label className="form-label">Medicine</label>
            <input
              type="text"
              className="form-control"
              value={t.medicine}
              onChange={(e) => handleChange(index, "medicine", e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Dosage</label>
            <input
              type="text"
              className="form-control"
              value={t.dosage}
              onChange={(e) => handleChange(index, "dosage", e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              value={t.notes}
              onChange={(e) => handleChange(index, "notes", e.target.value)}
            ></textarea>
          </div>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeTreatment(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button className="btn btn-secondary mb-3" onClick={addTreatment}>
        Add Treatment
      </button>

      <br />

      <button className="btn btn-success" onClick={handleSubmit}>
        Save Treatments
      </button>
    </div>
  );
}
