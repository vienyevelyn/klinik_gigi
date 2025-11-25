import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PrescriptionPage() {
  const { id_record } = useParams();

  const [details, setDetails] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [newDetail, setNewDetail] = useState({
    medicine_name: "",
    dosage: "",
    frequency: "",
    duration: "",
    doctor_instruction: "",
    quantity_prescribe: "",
  });

  // Load existing prescription details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/doctor/prescription/${id_record}`
        );
        setDetails(res.data || []);
      } catch (err) {
        console.error("Error loading prescription:", err);
        setDetails([]);
      }
    };

    fetchDetails();
  }, [id_record]);

  const handleChange = (e) => {
    setNewDetail({ ...newDetail, [e.target.name]: e.target.value });
  };

  const addDetail = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/doctor/prescription/${id_record}`,
        newDetail
      );

      setDetails([...details, res.data.data]);

      alert("Prescription added successfully!");

      setNewDetail({
        medicine_name: "",
        dosage: "",
        frequency: "",
        duration: "",
        doctor_instruction: "",
        quantity_prescribe: "",
      });
    } catch (err) {
      console.error("Error adding detail:", err);
      alert("Failed to add prescription detail.");
    }
  };

  // Edit Mode Handlers
  const startEdit = (detail) => {
    setEditId(detail.id_prescription_detail);
    setEditData({ ...detail });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const payload = {
        id_prescription_detail: editId,
        ...editData,
      };

      await axios.put(
        `http://localhost:3000/doctor/prescription/${id_record}`,
        payload
      );

      const updatedList = details.map((item) =>
        item.id_prescription_detail === editId ? editData : item
      );

      setDetails(updatedList);
      setEditId(null);

      alert("Prescription updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update prescription.");
    }
  };

  // DELETE prescription detail
  const deleteDetail = async (detailId) => {
    if (!window.confirm("Delete this prescription detail?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/doctor/prescription/${id_record}/${detailId}`
      );

      setDetails(details.filter((d) => d.id_prescription_detail !== detailId));

      alert("Prescription detail deleted");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete prescription.");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h2 className="text-primary fw-bold mb-4">
        Prescription Details (Record: {id_record})
      </h2>

      {/* Input Form */}
      <div className="card border-primary mb-4 shadow-sm">
        <div className="card-header bg-primary text-white fw-semibold">
          Add Prescription Detail
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Medicine Name</label>
              <input
                type="text"
                name="medicine_name"
                value={newDetail.medicine_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter medicine name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Dosage</label>
              <input
                type="text"
                name="dosage"
                value={newDetail.dosage}
                onChange={handleChange}
                className="form-control"
                placeholder="Ex: 500mg"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Frequency</label>
              <input
                type="text"
                name="frequency"
                value={newDetail.frequency}
                onChange={handleChange}
                className="form-control"
                placeholder="Ex: 3x"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Duration</label>
              <input
                type="text"
                name="duration"
                value={newDetail.duration}
                onChange={handleChange}
                className="form-control"
                placeholder="Ex: 7 days"
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">
                Doctor Instruction
              </label>
              <textarea
                name="doctor_instruction"
                rows="3"
                value={newDetail.doctor_instruction}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter instructions..."
              ></textarea>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                name="quantity_prescribe"
                value={newDetail.quantity_prescribe}
                onChange={handleChange}
                className="form-control"
                placeholder="Ex: 10"
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-4 fw-semibold"
            onClick={addDetail}
          >
            Add Detail
          </button>
        </div>
      </div>

      {/* Prescription Cards */}
      <div className="row g-3 mt-3">
        {details.length === 0 && (
          <p className="text-center text-muted">No prescription found.</p>
        )}

        {details.map((detail) => (
          <div className="col-md-6" key={detail.id_prescription_detail}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body bg-light">
                {editId === detail.id_prescription_detail ? (
                  <>
                    <h5 className="text-primary fw-bold mb-3">
                      Editing: {editData.medicine_name}
                    </h5>

                    <div className="mb-2">
                      <label className="form-label fw-semibold">Medicine</label>
                      <input
                        type="text"
                        name="medicine_name"
                        value={editData.medicine_name}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-semibold">Dosage</label>
                      <input
                        type="text"
                        name="dosage"
                        value={editData.dosage}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-semibold">Frequency</label>
                      <input
                        type="text"
                        name="frequency"
                        value={editData.frequency}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-semibold">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={editData.duration}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-semibold">
                        Instructions
                      </label>
                      <textarea
                        name="doctor_instruction"
                        value={editData.doctor_instruction}
                        onChange={handleEditChange}
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Quantity</label>
                      <input
                        type="number"
                        name="quantity_prescribe"
                        value={editData.quantity_prescribe}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </div>

                    <button
                      className="btn btn-success w-100 mb-2"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary w-100"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="text-primary fw-bold">
                      {detail.medicine_name}
                    </h5>
                    <hr />

                    <p><strong>Dosage:</strong> {detail.dosage}</p>
                    <p><strong>Frequency:</strong> {detail.frequency}</p>
                    <p><strong>Duration:</strong> {detail.duration}</p>
                    <p>
                      <strong>Instruction:</strong>{" "}
                      {detail.doctor_instruction}
                    </p>
                    <p><strong>Quantity:</strong> {detail.quantity_prescribe}</p>

                    <button
                      className="btn btn-warning w-100 mt-3 fw-semibold"
                      onClick={() => startEdit(detail)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger w-100 mt-2 fw-semibold"
                      onClick={() =>
                        deleteDetail(detail.id_prescription_detail)
                      }
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
