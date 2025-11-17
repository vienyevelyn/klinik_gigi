import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WorkSchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/patient/doctorschedule", { withCredentials: true })
      .then((res) => setSchedules(res.data))
      .catch((err) => console.error("Error fetching schedules:", err));
  }, []);

  const filteredSchedules = schedules.filter((item) => {
    const doctor = item?.doctor;
    const fullName = `${doctor?.user?.user_detail?.first_name || ""} ${doctor?.user?.user_detail?.last_name || ""}`.trim().toLowerCase();
    const category = doctor?.doctor_category?.name?.toLowerCase() || "";
    return fullName.includes(search.toLowerCase()) || category.includes(search.toLowerCase());
  });

  const handleBook = (schedule) => {
    navigate("/patient/appointment", { state: { schedule } });
  };

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-4">Doctor Work Schedules</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by doctor name or category…"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredSchedules.map((schedule) => {
          const ws = schedule.work_schedule;
          const doc = schedule.doctor;
          const user = doc?.user?.user_detail;

          return (
            <div key={schedule.id_doctor_schedule} className="col-md-6 col-xl-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">
                    {user ? `${user.first_name} ${user.last_name}` : "Unknown Doctor"}
                  </h5>
                  <p className="text-muted">{doc?.doctor_category?.name}</p>

                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                      <strong>Day:</strong> {ws?.day_of_the_week}
                    </li>
                    <li className="list-group-item">
                      <strong>Room:</strong> {ws?.room}
                    </li>
                    <li className="list-group-item">
                      <strong>Time:</strong> {ws?.start_time} - {ws?.end_time}
                    </li>
                  </ul>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleBook(schedule)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchedules.length === 0 && (
        <p className="text-center text-muted mt-4">No schedules found.</p>
      )}
    </div>
  );
}
