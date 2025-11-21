import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorRecordTable() {
  const [recordsIncomplete, setRecordsIncomplete] = useState([]);
  const [recordsComplete, setRecordsComplete] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    id_record: "",
    symptom: "",
    diagnosis: "",
    doctor_note: "",
    status: "complete", // Always set to complete when submitting
  });

  // Fetch records (incomplete + complete)
  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:3000/doctor/record", {
        withCredentials: true,
      });

      setRecordsIncomplete(res.data.incomplete || []);
      setRecordsComplete(res.data.complete || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Open modal
  const openForm = (record) => {
    setSelectedRecord(record);

    setFormData({
      id_record: record.id_record,
      symptom: record.symptom || "",
      diagnosis: record.diagnosis || "",
      doctor_note: record.doctor_note || "",
      status: "complete",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedRecord(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const submitForm = async () => {
    try {
      const payload = {
        ...formData,
        symptom: formData.symptom.trim(),
        diagnosis: formData.diagnosis.trim(),
        doctor_note: formData.doctor_note.trim(),
        status: "complete",
      };

      await axios.put(
        "http://localhost:3000/doctor/record",
        payload,
        { withCredentials: true }
      );

      closeForm();
      fetchRecords();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-5">

      {/* ========== INCOMPLETE TABLE ========== */}
      <h2 className="text-xl font-bold mb-3">Incomplete Medical Records</h2>

      <table className="table table-bordered mb-5">
        <thead className="table-light">
          <tr>
            <th>Record ID</th>
            <th>Appointment ID</th>
            <th>Patient</th>
            <th>Symptom</th>
            <th>Diagnosis</th>
            <th>Doctor Notes</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {recordsIncomplete.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-3">
                No incomplete records.
              </td>
            </tr>
          )}

          {recordsIncomplete.map((rec) => (
            <tr key={rec.id_record}>
              <td>{rec.id_record}</td>
              <td>{rec.id_appointment}</td>

              <td>{rec.first_name} {rec.last_name}</td>

              <td className={!rec.symptom ? "table-warning" : ""}>
                {rec.symptom || "—"}
              </td>

              <td className={!rec.diagnosis ? "table-warning" : ""}>
                {rec.diagnosis || "—"}
              </td>

              <td className={!rec.doctor_note ? "table-warning" : ""}>
                {rec.doctor_note || "—"}
              </td>

              <td>
                <span className="badge bg-warning text-dark">
                  Need to be filled
                </span>
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => openForm(rec)}
                >
                  Fill
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ========== COMPLETE TABLE ========== */}
      <h2 className="text-xl font-bold mb-3">Completed Medical Records</h2>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Record ID</th>
            <th>Appointment ID</th>
            <th>Patient</th>
            <th>Symptom</th>
            <th>Diagnosis</th>
            <th>Doctor Notes</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {recordsComplete.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-3">
                No completed records yet.
              </td>
            </tr>
          )}

          {recordsComplete.map((rec) => (
            <tr key={rec.id_record}>
              <td>{rec.id_record}</td>
              <td>{rec.id_appointment}</td>
              <td>{rec.first_name} {rec.last_name}</td>

              <td>{rec.symptom}</td>
              <td>{rec.diagnosis}</td>
              <td>{rec.doctor_note}</td>

              <td>
                <span className="badge bg-success">Completed</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -------- MODAL -------- */}
      {showForm && (
        <div
          className="modal show fade d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Complete Record #{selectedRecord?.id_record}
                </h5>
                <button className="btn-close" onClick={closeForm}></button>
              </div>

              <div className="modal-body">
                <label className="form-label">Symptom</label>
                <input
                  className="form-control mb-3"
                  name="symptom"
                  value={formData.symptom}
                  onChange={handleFormChange}
                />

                <label className="form-label">Diagnosis</label>
                <input
                  className="form-control mb-3"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleFormChange}
                />

                <label className="form-label">Doctor Notes</label>
                <textarea
                  className="form-control mb-3"
                  name="doctor_note"
                  value={formData.doctor_note}
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeForm}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={submitForm}>
                  Submit
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
