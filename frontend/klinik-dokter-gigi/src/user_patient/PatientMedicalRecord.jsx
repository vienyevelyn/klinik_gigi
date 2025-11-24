import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MedicalRecordsPatient() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | complete | incomplete
  const [selectedRecord, setSelectedRecord] = useState(null); // for modal
  const [treatments, setTreatments] = useState([]); // treatments for modal
  const [prescriptions, setPrescriptions] = useState([]); // prescriptions for modal

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/patient/record", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const payload = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setRecords(payload || []);
      } catch (err) {
        console.error("Failed to fetch records:", err);
        setError(err.response?.data?.message || err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const filtered = records.filter((r) => {
    if (filter === "all") return true;
    return (r.status || "").toLowerCase() === filter;
  });

  // Fetch treatments and prescriptions for selected record
  const handleViewDetails = async (rec) => {
    setSelectedRecord(rec); // open modal
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/patient/record/${rec.id_record}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setTreatments(res.data.complete || []); // backend returns array of RecordTreatment with Treatment
      setPrescriptions(res.data.prescription || []); // backend returns array of PrescriptionDetail
    } catch (err) {
      console.error("Failed to fetch details:", err);
      setTreatments([]);
      setPrescriptions([]);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 1000 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">My Medical Records</h3>
        <div className="d-flex gap-2 align-items-center">
          <label className="mb-0 me-1 small text-muted">Filter:</label>
          <select
            className="form-select form-select-sm"
            style={{ width: 160 }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" aria-hidden="true"></div>
          <div className="mt-2 text-muted">Loading records...</div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center text-muted py-4">No medical records found.</div>
      )}

      <div className="row g-3">
        {filtered.map((rec) => (
          <div className="col-md-6" key={rec.id_record}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-2">
                  {rec.appointment_date || "—"}{" "}
                  {rec.appointment_time ? `• ${rec.appointment_time}` : ""}
                </h5>

                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div></div>
                  <div className="text-end">
                    <div
                      className={`badge ${
                        rec.status === "complete" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {rec.status ?? "incomplete"}
                    </div>
                    <div className="small text-muted mt-1">
                      {rec.first_name || ""} {rec.last_name || ""}
                    </div>
                  </div>
                </div>

                <hr />

                <p className="mb-1">
                  <strong>Symptom:</strong> {rec.symptom || "-"}
                </p>
                <p className="mb-1">
                  <strong>Diagnosis:</strong> {rec.diagnosis || "-"}
                </p>

                <div className="mt-3 p-3 bg-light rounded">
                  <h6 className="mb-2">Doctor Note</h6>
                  <div className="small text-muted">{rec.doctor_note || "-"}</div>
                </div>

                <div className="mt-3">
                  <button className="btn btn-sm btn-primary" onClick={() => handleViewDetails(rec)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRecord && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedRecord.appointment_date || "—"}{" "}
                  {selectedRecord.appointment_time ? `• ${selectedRecord.appointment_time}` : ""}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setSelectedRecord(null);
                    setTreatments([]);
                    setPrescriptions([]);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {/* Treatments Table */}
                <h6>Treatments</h6>
                {treatments.length > 0 ? (
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Procedure Name</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treatments.map((t, i) => (
                        <tr key={i}>
                          <td>{t.treatment?.procedure_name || "-"}</td>
                          <td>
                            {t.treatment?.cost != null
                              ? t.treatment.cost.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted">No treatments found</p>
                )}

                <hr />

                {/* Prescriptions Table */}
                <h6>Prescriptions</h6>
                {prescriptions.length > 0 ? (
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Medicine Name</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                        <th>Instruction</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptions.map((p, i) => (
                        <tr key={i}>
                          <td>{p.medicine_name}</td>
                          <td>{p.dosage}</td>
                          <td>{p.frequency}</td>
                          <td>{p.duration}</td>
                          <td>{p.doctor_instruction}</td>
                          <td>{p.quantity_prescribe}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted">No prescriptions found</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedRecord(null);
                    setTreatments([]);
                    setPrescriptions([]);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div
            onClick={() => {
              setSelectedRecord(null);
              setTreatments([]);
              setPrescriptions([]);
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
