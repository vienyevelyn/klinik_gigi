import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthed: false,
    username: null,
    role: null,    // make sure role is here
    loading: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user info, including role
    axios.get("http://localhost:3000", { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth({ 
            isAuthed: true, 
            username: res.data.username, 
            role: res.data.role,   // <-- set role here
            loading: false 
          });
        } else {
          setAuth({ isAuthed: false, username: null, role: null, loading: false });
        }
      })
      .catch(() => setAuth({ isAuthed: false, username: null, role: null, loading: false }));
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      r => r,
      err => {
        if (err.response && err.response.status === 401) {
          setAuth({ isAuthed: false, username: null, role: null, loading: false });
          navigate("/loginpatient", { replace: true }); // redirect to login
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  const logout = async () => {
    await axios.get("http://localhost:3000/logout", { withCredentials: true }).catch(() => {});
    setAuth({ isAuthed: false, username: null, role: null, loading: false });
    navigate("/loginpatient", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthProvider };
