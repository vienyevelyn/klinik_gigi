import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminWorkSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    id_work_schedule: "",
    day_of_the_week: "",
    start_time: "",
    end_time: "",
    room: "",
    status: "Available",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/workschedule");
      setSchedules(res.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3000/admin/workschedule/${selectedId}`,
          formData
        );
        setEditMode(false);
        setSelectedId(null);
      } else {
        await axios.post("http://localhost:3000/admin/workschedule", formData);
      }
      setFormData({
        id_work_schedule: "",
        day_of_the_week: "",
        start_time: "",
        end_time: "",
        room: "",
        status: "Available",
      });
      fetchSchedules();
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id_work_schedule: item.id_work_schedule,
      day_of_the_week: item.day_of_the_week,
      start_time: item.start_time,
      end_time: item.end_time,
      room: item.room,
      status: item.status,
    });
    setSelectedId(item.id_work_schedule);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/workschedule/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">Doctor Work Schedule Management</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input
                type="text"
                name="id_work_schedule"
                value={formData.id_work_schedule}
                onChange={handleChange}
                className="form-control"
                placeholder="Example: WS001"
                required
                disabled={editMode}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Day of the Week</label>
              <select
                name="day_of_the_week"
                value={formData.day_of_the_week}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Time</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Room</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="form-control"
                placeholder="Example: R001"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option>Available</option>
                <option>Taken</option>
              </select>
            </div>

            <button
              type="submit"
              className={`btn w-100 ${editMode ? "btn-primary" : "btn-success"}`}
            >
              {editMode ? "Update Schedule" : "Add Schedule"}
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow mt-5">
        <div className="card-body">
          <h4 className="mb-3">Work Schedule List</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Day</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.length > 0 ? (
                  schedules.map((item) => (
                    <tr key={item.id_work_schedule}>
                      <td>{item.id_work_schedule}</td>
                      <td>{item.day_of_the_week}</td>
                      <td>{item.start_time}</td>
                      <td>{item.end_time}</td>
                      <td>{item.room}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "Available"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(item.id_work_schedule)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No work schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
