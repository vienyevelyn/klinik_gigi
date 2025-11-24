import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DoctorTreatmentPage() {
  const { id_record } = useParams();

  const [treatmentOptions, setTreatmentOptions] = useState([]); 
  const [recordTreatments, setRecordTreatments] = useState([]); 
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTreatmentOptions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/doctor/treatment/${id_record}`,
        { withCredentials: true }
      );

      setTreatmentOptions(res.data.data || []);
      setRecordTreatments(res.data.data2 || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTreatmentOptions().then(() => setLoading(false));
  }, [id_record]);

  const handleSubmit = async () => {
    if (!selectedTreatment) {
      return alert("Please select a treatment");
    }

    try {
      await axios.post(
        `http://localhost:3000/doctor/treatment/${id_record}`,
        { id_treatment: selectedTreatment },
        { withCredentials: true }
      );

      alert("Treatment added!");
      fetchTreatmentOptions();
      setSelectedTreatment("");
    } catch (err) {
      console.log(err);
      alert("Failed to save treatment");
    }
  };

  const handleDelete = async (id_record_treatment) => {
    if (!confirm("Are you sure you want to remove this treatment?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/doctor/treatment/${id_record_treatment}`,
        { withCredentials: true }
      );

      alert("Treatment removed!");
      fetchTreatmentOptions();
    } catch (err) {
      console.log(err);
      alert("Failed to delete treatment");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container p-5">
      <h2 className="text-xl font-bold mb-4">
        Treatments for Record #{id_record}
      </h2>

      <hr className="my-4" />

      {/* SELECT TREATMENT TABLE */}
      <h4 className="mb-3">Select Treatment</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Select</th>
            <th>Treatment Name</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {treatmentOptions.map((t) => (
            <tr key={t.id_treatment}>
              <td>
                <input
                  type="radio"
                  name="treatmentSelect"
                  value={t.id_treatment}
                  checked={selectedTreatment === t.id_treatment}
                  onChange={() => setSelectedTreatment(t.id_treatment)}
                />
              </td>
              <td>{t.procedure_name}</td>
              <td>Rp {t.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-success mt-3" onClick={handleSubmit}>
        Add Treatment
      </button>

      <hr className="my-4" />

      {/* EXISTING TREATMENTS TABLE */}
      <h4 className="mb-3">Existing Treatments for This Record</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Treatment Name</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {recordTreatments.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No treatments added yet.
              </td>
            </tr>
          ) : (
            recordTreatments.map((rt) => (
              <tr key={rt.id_record_treatment}>
                <td>{rt.treatment?.procedure_name}</td>
                <td>Rp {rt.treatment?.cost}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(rt.id_record_treatment)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
