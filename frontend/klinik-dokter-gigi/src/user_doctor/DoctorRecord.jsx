import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorRecordTable() {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    symptom: "",
    diagnosis: "",
    doctor_note: "",
  });

  // Fetch all incomplete medical records
  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:3000/doctor/record", {
        withCredentials: true,
      });
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const openForm = (record) => {
    setSelectedRecord(record);
    setFormData({
      symptom: record.symptom || "",
      diagnosis: record.diagnosis || "",
      doctor_note: record.doctor_note || "",
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      await axios.put(
        `http://localhost:3000/doctor/record/${selectedRecord.id_record}`,
        formData
      );

      setShowForm(false);
      fetchRecords();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-5">
      <h2 className="text-xl font-bold mb-4">Incomplete Medical Records</h2>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Record ID</th>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Symptom</th>
            <th>Diagnosis</th>
            <th>Doctor Notes</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec) => {
            const isIncomplete =
              !rec.symptom || !rec.diagnosis || !rec.doctor_note;

            return (
              <tr key={rec.id_record}>
                <td>{rec.id_record}</td>
                <td>{rec.id_appointment}</td>
                <td>{rec.patient_name}</td>

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
                  {isIncomplete ? (
                    <span className="badge bg-warning text-dark">
                      Need to be filled
                    </span>
                  ) : (
                    <span className="badge bg-success">Completed</span>
                  )}
                </td>

                <td>
                  {isIncomplete && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => openForm(rec)}
                    >
                      Fill
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      {showForm && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Complete Record {selectedRecord?.id_record}
                </h5>
                <button className="btn-close" onClick={() => setShowForm(false)}></button>
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
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
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
