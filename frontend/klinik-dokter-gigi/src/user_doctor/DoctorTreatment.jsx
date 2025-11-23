import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DoctorTreatmentPage() {
  const { id_record } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch record
  const fetchRecord = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/doctor/record/${id_record}`,
        { withCredentials: true }
      );
      setRecord(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch all treatment options
  const fetchTreatmentOptions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/doctor/treatment/${id_record}`,
        { withCredentials: true }
      );
      setTreatmentOptions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.all([fetchRecord(), fetchTreatmentOptions()]).then(() =>
      setLoading(false)
    );
  }, [id_record]);

  // Submit ONE treatment
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

      alert("Treatment saved successfully!");
      navigate("/doctor/records");
    } catch (err) {
      console.log(err);
      alert("Failed to save treatment");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container p-5">
      <h2 className="text-xl font-bold mb-4">
        Add Treatment for Record #{id_record}
      </h2>

      <p>
        <strong>Patient:</strong> {record?.first_name} {record?.last_name}
      </p>
      <p>
        <strong>Diagnosis:</strong> {record?.diagnosis}
      </p>

      <hr className="my-4" />

      {/* TABLE OF TREATMENTS */}
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
        Save Treatment
      </button>
    </div>
  );
}
