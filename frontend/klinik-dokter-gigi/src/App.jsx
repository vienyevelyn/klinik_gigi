import './App.css';
import { Route, Routes } from 'react-router-dom';
import Regist from './Regist';
import Home from './Home';
import Login from './Login/LoginPatient';
import LoginDoctor from './Login/LoginDoctor';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import PatientProfile from "./user_patient/PatientProfile";
import PatientDoctorSchedule from "./user_patient/PatientDoctorSchedule";
import PatientAppointment from "./user_patient/PatientAppointment";
import PatientAppointmentList from "./user_patient/PatientAppointmentList";
import AdminProfile from "./user_admin/AdminProfile";
import LoginAdmin from './Login/LoginAdmin';
import AdminDoctorCategory from './user_admin/AdminDoctorCategory';
import AdminWorkSchedule from './user_admin/AdminWorkSchedule';
import AdminAppointment from './user_admin/AdminAppointment';
import DoctorProfile from './user_doctor/DoctorProfile';

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
        path="/patient/profile"
        element={
          <ProtectedRoute role="patient">
            <PatientProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute role="doctor">
            <DoctorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute role="admin">
            <AdminProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/doctorcategory"
        element={
          <ProtectedRoute role="admin">
            <AdminDoctorCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/workschedule"
        element={
          <ProtectedRoute role="admin">
            <AdminWorkSchedule />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/appointment"
        element={
          <ProtectedRoute role="admin">
            <AdminAppointment />
          </ProtectedRoute>
        }
      />

    <Route
        path="/patient/doctorschedule"
        element={
          <ProtectedRoute role="patient">
            <PatientDoctorSchedule />
          </ProtectedRoute>
        }
      />

    <Route
        path="/patient/appointment"
        element={
          <ProtectedRoute role="patient">
            <PatientAppointment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/appointmentlist"
        element={
          <ProtectedRoute role="patient">
            <PatientAppointmentList />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
