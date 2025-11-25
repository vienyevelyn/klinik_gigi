import React, { useState, useEffect } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import axios from "axios";

export default function AppointmentPage() {
  const { state } = useLocation();
  const schedule = state?.schedule;

  const navigate = useNavigate();
  
  const [appointmentTime, setAppointmentTime] = useState("");
  const [patientNote, setPatientNote] = useState("");
  const [appointmentType, setAppointmentType] = useState("Consultation");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [dateOptions, setDateOptions] = useState([]);

  if (!schedule) {
    return <p className="text-center mt-5">Invalid schedule data.</p>;
  }

  const ws = schedule.work_schedule;
  const doc = schedule.doctor;
  const user = doc?.user?.user_detail;

  const appointmentOptions = [
    "Consultation",
    "Routine Check-up",
    "Cleaning",
    "Filling",
    "Extraction",
    "Root Canal",
    "Crown/Bridge",
    "Orthodontic Consultation",
    "Implant",
    "Emergency",
    "Whitening",
    "Pediatric",
    "Follow-up"
  ];

  // Generate upcoming dates for this week, next week, and two weeks later
  useEffect(() => {
    const generateDates = () => {
      const dayMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
      };

      const targetDay = dayMap[ws.day_of_the_week];
      const today = new Date();
      const dates = [];

      for (let i = 0; i < 3; i++) {
        const date = new Date(today);
        const diff = (targetDay - date.getDay() + 7) % 7 + i * 7;
        date.setDate(date.getDate() + diff);
        dates.push(new Date(date)); // store as Date object
      }

      setDateOptions(dates);
      setAppointmentDate(null);
    };

    generateDates();
  }, [ws.day_of_the_week]);

  const handleSubmit = async () => {
    try {
      const payload = {
        id_doctor_schedule: schedule.id_doctor_schedule,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        appointment_type: appointmentType,
        patient_note: patientNote,
        status: "scheduled",
      };

      const res = await axios.post(
        "http://localhost:3000/patient/appointment",
        payload,
        { withCredentials: true }
      );

      alert("Appointment booked successfully!");
      console.log(res.data);
      navigate("/patient/appointmentlist");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message ||"Failed to book appointment.");
    }
  };

  // Format date nicely
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Book Appointment</h2>

      <div className="card shadow-sm p-4">
        <h4 className="fw-semibold">
          {user.first_name} {user.last_name}
        </h4>
        <p className="text-muted">{doc.doctor_category.name}</p>

        <div className="mt-3">
          <label className="form-label fw-bold">Select Appointment Date</label>
          <div className="d-flex gap-2 flex-wrap">
            {dateOptions.map((date) => {
  const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  // GET TODAY'S DATE LOCAL TIME (Asia/Jakarta)
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // SKIP TODAY
  if (isoDate === todayIso) return null;

  return (
    <button
      key={isoDate}
      className={`btn ${appointmentDate === isoDate ? "btn-primary" : "btn-outline-primary"}`}
      onClick={() => setAppointmentDate(isoDate)}
    >
      {formatDate(date)}
    </button>
  );
})}
          </div>

          <label className="form-label fw-bold mt-3">Select Appointment Time</label>
          <input
            type="time"
            className="form-control"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />

          <label className="form-label fw-bold mt-3">Appointment Type</label>
          <select
            className="form-select"
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          >
            {appointmentOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label className="form-label fw-bold mt-3">Patient Note</label>
          <textarea
            className="form-control"
            value={patientNote}
            onChange={(e) => setPatientNote(e.target.value)}
          />
        </div>

        <button className="btn btn-success mt-4 w-100" onClick={handleSubmit}>
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
