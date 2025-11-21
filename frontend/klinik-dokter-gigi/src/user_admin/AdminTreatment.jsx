import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTreatmentPage() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // track if updating

  const [formData, setFormData] = useState({
    id_treatment: "",
    procedure_name: "",
    cost: "",
  });

  const fetchTreatments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/treatments", {
        withCredentials: true,
      });
      setTreatments(res.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const openForm = (treatment = null) => {
    if (treatment) {
      setFormData({
        id_treatment: treatment.id_treatment,
        procedure_name: treatment.procedure_name,
        cost: treatment.cost,
      });
      setIsEditing(true);
    } else {
      setFormData({ id_treatment: "", procedure_name: "", cost: "" });
      setIsEditing(false);
    }
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!formData.id_treatment || !formData.procedure_name || !formData.cost) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (isEditing) {
        // Update treatment
        await axios.put(
          `http://localhost:3000/admin/treatments/${formData.id_treatment}`,
          formData,
          { withCredentials: true }
        );
        alert("Treatment updated successfully!");
      } else {
        // Add new treatment
        await axios.post(
          "http://localhost:3000/admin/treatments",
          formData,
          { withCredentials: true }
        );
        alert("Treatment added successfully!");
      }
      closeForm();
      fetchTreatments();
    } catch (err) {
      console.log(err);
      alert("Failed to save treatment.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this treatment?")) {
      try {
        await axios.delete(`http://localhost:3000/admin/treatments/${id}`, {
          withCredentials: true,
        });
        fetchTreatments();
        alert("Treatment deleted successfully!");
      } catch (err) {
        console.log(err);
        alert("Failed to delete treatment.");
      }
    }
  };

  if (loading) return <p>Loading treatments...</p>;

  return (
    <div className="container p-5">
      <h2 className="text-xl font-bold mb-4">Treatment Management</h2>

      <button className="btn btn-primary mb-4" onClick={() => openForm()}>
        Add New Treatment
      </button>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Procedure Name</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {treatments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-3">
                No treatments found.
              </td>
            </tr>
          ) : (
            treatments.map((t) => (
              <tr key={t.id_treatment}>
                <td>{t.id_treatment}</td>
                <td>{t.procedure_name}</td>
                <td>{t.cost}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => openForm(t)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(t.id_treatment)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <div
          className="modal show fade d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Update Treatment" : "Add New Treatment"}
                </h5>
                <button className="btn-close" onClick={closeForm}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Treatment ID</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="id_treatment"
                  value={formData.id_treatment}
                  onChange={handleFormChange}
                  disabled
                />

                <label className="form-label">Procedure Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="procedure_name"
                  value={formData.procedure_name}
                  onChange={handleFormChange}
                />

                <label className="form-label">Cost</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  name="cost"
                  value={formData.cost}
                  onChange={handleFormChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeForm}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  {isEditing ? "Update Treatment" : "Save Treatment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
