import { useParams } from "react-router-dom";
import { useState } from "react";

export default function DoctorPrescriptionPage() {
  const { id_record } = useParams();

  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");

  const submitPrescription = async () => {
    await axios.post("http://localhost:3000/doctor/prescription", {
      id_record,
      medicine,
      dosage,
      instructions
    });
  };

  return (
    <div className="p-5">
      <h2 className="mb-3">Prescribe Medicine for Record {id_record}</h2>

      <label>Medicine Name</label>
      <input className="form-control mb-3"
        value={medicine}
        onChange={(e)=>setMedicine(e.target.value)}
      />

      <label>Dosage</label>
      <input className="form-control mb-3"
        value={dosage}
        onChange={(e)=>setDosage(e.target.value)}
      />

      <label>Instructions</label>
      <textarea className="form-control mb-3"
        value={instructions}
        onChange={(e)=>setInstructions(e.target.value)}
      ></textarea>

      <button className="btn btn-success" onClick={submitPrescription}>
        Submit Prescription
      </button>
    </div>
  );
}
