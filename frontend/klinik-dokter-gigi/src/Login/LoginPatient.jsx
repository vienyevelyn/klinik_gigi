import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import loginImg from "../assets/loginimg.png";
import 'bootstrap-icons/font/bootstrap-icons.css';

function LoginPatient() {
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // ✅ get setAuth from AuthContext
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  //password show
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Login request
      const resLogin = await axios.post(
        "http://localhost:3000/loginpatient",
        formData,
        { withCredentials: true } // important for cookies
      );

      if (resLogin.data.Status === "Success") {
        // 2️⃣ Fetch user info (to get username + role)
        const resAuth = await axios.get("http://localhost:3000/", {
          withCredentials: true,
        });

        if (resAuth.data.Status === "Success") {
          // 3️⃣ Update AuthContext
          setAuth({
            isAuthed: true,
            username: resAuth.data.username,
            role: resAuth.data.role, // make sure backend sends role
            loading: false,
          });

          // 4️⃣ Navigate safely to protected route
          navigate("/patient/doctorschedule");
          alert("Login successful!");
        } else {
          alert("Failed to fetch user info!");
        }
      } else {
        alert("Login failed: " + (resLogin.data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login request failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex bg-primary vh-100 w-100">
      <div style={{display: "flex", flex: 1}}>
        {/* left */}
        <div style={{flex: 5, backgroundColor: "#5463A4", color: "white"}}>
          <div style={{display: "flex", 
                      flexDirection: "column", 
                      justifyContent: "center", 
                      alignItems: "flex-end",
                      fontSize: "40px",
                      paddingTop: "60px"}}>
            <div style={{backgroundColor: "#E7EEFE", color: "#5463A4", borderRadius: "60px 0px 0px 60px", width: "300px", textAlign: "right", paddingRight: "30px"}}>
              Patient Login
            </div>
            
            <a href="/logindoctor" style={{ textDecoration: "none", color: "white", paddingRight: "30px"}}>Doctor Login</a>
            <a href="/loginadmin" style={{ textDecoration: "none", color: "white", paddingRight: "30px"}}>Admin Login</a>
          </div>  

          <div style={{ width: "100%", textAlign: "center", marginTop: "40px" }}>
            <img src={loginImg} alt="teeth" style={{ maxWidth: "80%", height: "auto", width: "70%"}} />
          </div>
        </div>
        {/* right */}
        <div style={{flex: 4, 
                    backgroundColor: "#E7EEFE",
                    color: "#170C81", 
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: "20px"}}>
          <h1>PATIENT LOGIN</h1>
          <br />
          <form onSubmit={handleSubmit} style={{width: "60%"}}>
            <div style={{marginBottom: "30px"}}>
              <label htmlFor="username">
                <h4>Username</h4>
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0 10px", 
                  height: "40px",    
                  backgroundColor: "white",
                }}
>               
                <i className="bi bi-person-circle" style={{ color: "#170C81", marginRight: "8px" }}></i>

                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={{
                    border: "none",       
                    outline: "none",      
                    flex: 1,              
                    height: "100%",       
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            <div style={{marginBottom: "10px"}}>
              <label htmlFor="username">
                <h5>Password</h5>
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0 10px", 
                  height: "40px",    
                  backgroundColor: "white",
                }}>
                
                <i class="bi bi-key" ></i>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  className="form-control rounded-0"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    border: "none",       
                    outline: "none",      
                    flex: 1,              
                    height: "100%",       
                    fontSize: "16px",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    border: "none",
                    background: "transparent", 
                    padding: 0,
                    cursor: "pointer"
                  }}
                >

                  <i className={showPassword ? "bi bi-unlock2" : "bi bi-lock"} style={{ color: "#170C81" }}></i>
                </button>
              </div>
              </div>

            <p style={{textAlign: "center"}}>Don't have an account? <a href="/register">Register</a></p>

            <button type="submit" style={{backgroundColor: "#170C81", border: "none"}} className="btn btn-success w-100 rounded-0">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPatient;
