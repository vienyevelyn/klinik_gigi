import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/appointment", {
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

  const markFinished = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/admin/appointment/${id}`,
        { status: "finished" },
        { withCredentials: true }
      );
      alert("Appointment marked as finished");
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to update appointment status.");
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await axios.put(
        `http://localhost:3000/admin/appointment/${id}`,
        { status: "cancelled" },
        { withCredentials: true }
      );
      alert("Appointment cancelled");
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading appointments...</p>;

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((appt) => appt.status === filter);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">All Appointments</h2>

      {/* Status Filter */}
      <div className="mb-3">
        <label className="form-label fw-bold">Filter by status:</label>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="doctor approval">Doctor Approval</option>
          <option value="cancelled">Cancelled</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      <div className="row g-3">
        {filteredAppointments.length === 0 ? (
          <p className="text-center">No appointments to display.</p>
        ) : (
          filteredAppointments.map((appt) => {
            const ds = appt.doctor_schedule;
            const doc = ds?.doctor;
            const doctorUser = doc?.user?.user_detail;
            const ws = ds?.work_schedule;
            const patientUser = appt.patient?.user_detail;

            const date = new Date(appt.appointment_date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            });

            return (
              <div key={appt.id_appointment} className="col-md-6">
                <div className="card shadow-sm p-3">
                  <h5 className="fw-semibold">
                    Dr. {doctorUser?.first_name} {doctorUser?.last_name}
                  </h5>
                  {doc?.doctor_category?.name && (
                    <p className="text-muted">{doc.doctor_category.name}</p>
                  )}

                  <p>
                    <strong>Patient:</strong> {patientUser?.first_name} {patientUser?.last_name} <br />
                    <strong>Date:</strong> {date} <br />
                    <strong>Time:</strong> {appt.appointment_time} <br />
                    <strong>Day:</strong> {ws?.day_of_the_week} <br />
                    <strong>Room:</strong> {ws?.room} <br />
                    <strong>Type:</strong> {appt.appointment_type} <br />
                    <strong>Status:</strong> {appt.status} <br />
                    {appt.patient_note && (
                      <>
                        <strong>Note:</strong> {appt.patient_note}
                      </>
                    )}
                  </p>

                  {/* Admin Action Buttons */}
                  <div className="d-flex gap-2">
                    {appt.status === "scheduled" && (
                      <button
                        className="btn btn-danger flex-fill"
                        onClick={() => cancelAppointment(appt.id_appointment)}
                      >
                        Cancel
                      </button>
                    )}
                    {appt.status === "doctor approval" && (
                      <button
                        className="btn btn-primary flex-fill"
                        onClick={() => markFinished(appt.id_appointment)}
                      >
                        Mark as Finished
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
