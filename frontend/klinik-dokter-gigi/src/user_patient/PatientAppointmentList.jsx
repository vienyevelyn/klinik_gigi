import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all upcoming appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/patient/appointmentlist", {
        withCredentials: true,
      });
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await axios.delete(`http://localhost:3000/patient/appointmentlist/${id}`, {
        withCredentials: true,
      });
      alert("Appointment cancelled successfully!");
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading appointments...</p>;

  if (!appointments.length)
    return <p className="text-center mt-5">You have no upcoming appointments.</p>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Your Upcoming Appointments</h2>

      <div className="row g-3">
        {appointments.map((appt) => {
          const ds = appt.doctor_schedule;
          const doc = ds?.doctor;
          const doctorUser = doc?.user?.user_detail;
          const ws = ds?.work_schedule;
          const date = new Date(appt.appointment_date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          });

          return (
            <div key={appt.id_appointment} className="col-md-6">
              <div className="card shadow-sm p-3">
                {/* Doctor Name */}
                <h5 className="fw-semibold">
                  Dr. {doctorUser?.first_name} {doctorUser?.last_name}
                </h5>

                {/* Doctor Category (optional) */}
                {doc?.doctor_category?.name && (
                  <p className="text-muted">{doc.doctor_category.name}</p>
                )}

                {/* Appointment Details */}
                <p>
                  <strong>Date:</strong> {date} <br />
                  <strong>Time:</strong> {appt.appointment_time} <br />
                  <strong>Day:</strong> {ws?.day_of_the_week} <br />
                  <strong>Room:</strong> {ws?.room} <br />
                  <strong>Type:</strong> {appt.appointment_type} <br />
                  {appt.patient_note && (
                    <>
                      <strong>Note:</strong> {appt.patient_note}
                    </>
                  )}
                </p>

                {/* Cancel Button */}
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleCancel(appt.id_appointment)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
