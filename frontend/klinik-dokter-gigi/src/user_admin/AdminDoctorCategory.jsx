import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDoctorCategory() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id_doctor_category: "",
    name: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/doctorcategory");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching doctor categories:", error);
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
          `http://localhost:3000/admin/doctorcategory/${selectedId}`,
          formData
        );
        setEditMode(false);
        setSelectedId(null);
      alert("Category updated successfully!");

      } else {
        await axios.post("http://localhost:3000/admin/doctorcategory", formData);
      alert("Category added successfully!");
        
      }
      setFormData({ id_doctor_category: "", name: "", description: "" });
      fetchCategories();
    } catch (error) {
      console.error("Error saving doctor category:", error);
      alert("Category failed successfully!");
    }
  };

  const handleEdit = (category) => {
    setFormData({
      id_doctor_category: category.id_doctor_category,
      name: category.name,
      description: category.description,
    });
    setSelectedId(category.id_doctor_category);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/admin/doctorcategory/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting doctor category:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">Doctor Category Management</h2>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input
                type="text"
                name="id_doctor_category"
                value={formData.id_doctor_category}
                onChange={handleChange}
                className="form-control"
                placeholder=""
                required
                 disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Example: Dentist"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Short description of this category"
                required
              />
            </div>

            <button
              type="submit"
              className={`btn w-100 ${
                editMode ? "btn-primary" : "btn-success"
              }`}
            >
              {editMode ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow mt-5">
        <div className="card-body">
          <h4 className="mb-3">Category List</h4>

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat.id_doctor_category}>
                      <td>{cat.id_doctor_category}</td>
                      <td>{cat.name}</td>
                      <td>{cat.description}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(cat)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(cat.id_doctor_category)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No categories found.
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
