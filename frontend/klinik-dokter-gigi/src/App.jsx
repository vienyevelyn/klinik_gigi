import './App.css';
import { Route, Routes } from 'react-router-dom';
import Regist from './Regist';
import Home from './Home';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import PatientProfile from "./user_patient/PatientProfile";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
    </Routes>
  );
}

export default App;
