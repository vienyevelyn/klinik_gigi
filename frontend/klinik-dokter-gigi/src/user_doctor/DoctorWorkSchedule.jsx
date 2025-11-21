import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorPickSchedule() {
  const [currentSchedules, setCurrentSchedules] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);

  // Fetch current doctor's schedules
  const fetchCurrentSchedules = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/doctor/currentschedule",
        { withCredentials: true }
      );
      setCurrentSchedules(res.data);
    } catch (err) {
      console.error("Error fetching current schedules:", err);
    }
  };

  // Fetch available schedules
  const fetchAvailableSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:3000/doctor/workschedule");
      setAvailableSchedules(res.data);
    } catch (err) {
      console.error("Error fetching available schedules:", err);
    }
  };

  useEffect(() => {
    fetchCurrentSchedules();
    fetchAvailableSchedules();
  }, []);

  // Book schedule
  const handleBook = async (id_ws) => {
    try {
      await axios.post(
        "http://localhost:3000/doctor/workschedule",
        { id_ws: id_ws },
        { withCredentials: true }
      );
      alert("Schedule booked successfully!");
      fetchCurrentSchedules();
      fetchAvailableSchedules();
    } catch (err) {
      console.error(err);
      alert("Failed to book schedule.");
    }
  };

  // Drop schedule
  const handleDrop = async (id_ws) => {
    try {
      await axios.put(
        "http://localhost:3000/doctor/currentschedule",
        { id_ws: id_ws },
        { withCredentials: true }
      );
      alert("Schedule dropped successfully!");
      fetchCurrentSchedules();
      fetchAvailableSchedules();
    } catch (err) {
      console.error(err);
      alert("Failed to drop schedule.");
    }
  };

  return (
    <div className="container py-4">

      {/* Current Schedules */}
      <div className="mb-5">
        <h3 className="fw-bold mb-3">Your Current Schedules</h3>

        <table className="table table-bordered table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Room</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentSchedules.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-2">No schedules yet</td>
              </tr>
            ) : (
              currentSchedules.map((sched) => (
                <tr key={sched.id_work_schedule}>
                  <td>{sched.work_schedule.day_of_the_week}</td>
                  <td>{sched.work_schedule.start_time}</td>
                  <td>{sched.work_schedule.end_time}</td>
                  <td>{sched.work_schedule.room}</td>
                  <td>{sched.status || "Booked"}</td>
                  <td>
                    <button
                      onClick={() => handleDrop(sched.id_work_schedule)}
                      className="btn btn-danger btn-sm"
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Available Schedules */}
      <div>
        <h3 className="fw-bold mb-3">Available Schedules</h3>

        <table className="table table-bordered table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Room</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {availableSchedules.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-2">No available schedules</td>
              </tr>
            ) : (
              availableSchedules.map((schedule) => (
                <tr key={schedule.id_work_schedule}>
                  <td>{schedule.day_of_the_week}</td>
                  <td>{schedule.start_time}</td>
                  <td>{schedule.end_time}</td>
                  <td>{schedule.room}</td>
                  <td>{schedule.status || "Available"}</td>
                  <td>
                    <button
                      onClick={() => handleBook(schedule.id_work_schedule)}
                      className="btn btn-success btn-sm"
                      disabled={schedule.status === "Taken"}
                    >
                      {schedule.status === "Taken" ? "Taken" : "Book"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
