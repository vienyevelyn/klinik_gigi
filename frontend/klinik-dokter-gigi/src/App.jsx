import './App.css';
import { Route, Routes } from 'react-router-dom';
import Regist from './Regist';
import Home from './Home';
import Login from './Login/LoginPatient';
import LoginDoctor from './Login/LoginDoctor';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import PatientProfile from "./user_patient/PatientProfile";
import AdminProfile from "./user_admin/AdminProfile";
import LoginAdmin from './Login/LoginAdmin';
import AdminDoctorCategory from './user_admin/AdminDoctorCategory';
import AdminWorkSchedule from './user_admin/AdminWorkSchedule';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/loginpatient" element={<Login />} />
      <Route path="/logindoctor" element={<LoginDoctor />} />
      <Route path="/loginadmin" element={<LoginAdmin />} />
      <Route path="/register" element={<Regist />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/:id"
        element={
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/:id"
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/doctorcategory"
        element={
          <ProtectedRoute>
            <AdminDoctorCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/workschedule"
        element={
          <ProtectedRoute>
            <AdminWorkSchedule />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
