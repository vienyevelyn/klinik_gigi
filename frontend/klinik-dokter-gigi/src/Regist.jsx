import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from "./assets/loginimg.png"; 

function Regist() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nik: '',
    first_name: '',
    last_name: '',
    city_of_birth: '',
    date_of_birth: '',
    gender: '',
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  //password show
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  //verify password
  const [confirmPasword, setConfirmPassword] = useState("")

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData((prev) => ({
        ...prev,
        photo: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //check password
    if(formData.password !== confirmPasword) {
      alert("Password do not match!");
      return; 
    }

    axios.post("http://localhost:3000/register", formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})
    .then(res => {
      if (res.data.Status === "Success") {
        alert("Registration successful!");
        navigate("/loginpatient");
      } else {
        alert("Registration error");
      }
      setFormData({
        nik: '',
        first_name: '',
        last_name: '',
        city_of_birth: '',
        date_of_birth: '',
        gender: '',
      
        username: '',
        phone: '',
        email: '',
        password: '',
      });
    })
    .catch(err => {
      console.error(err);
      alert("Registration failed!");
    });
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
          <br />
          <h1>REGISTER</h1>
          <br />

          <form onSubmit={handleSubmit} style={{
            width: "60%",
            overflowY: "auto",
            paddingBottom: "60px",
            height: "60%"
          }}>
            <div>
              {/* NIK */}
              <div style={{marginBottom: "10px"}}>
                <label><h5>NIK</h5></label>
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

                <i class="bi bi-credit-card-2-front"></i>

                <input 
                  type="text"
                  name="nik"
                  placeholder="Enter NIK"
                  className="form-control rounded-0"
                  value={formData.nik}
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

              {/* Name */}
              <div style={{display: "flex", marginBottom: "10px"}}>
                {/* first name */}
                <div>
                  <label><h5>First Name</h5></label>
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
                  
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Enter First Name"
                      className="form-control rounded-0"
                      value={formData.first_name}
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
                
                {/* last name */}
                <div>
                  <label><h5>Last Name</h5></label>
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
                  
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Enter First Name"
                      className="form-control rounded-0"
                      value={formData.last_name}
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

              </div>              

              {/* City of Birth */}
              <div style={{marginBottom: "10px"}}>
                <label><h5>City of Birth</h5></label>
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

                  <i class="bi bi-houses"></i>

                  <input 
                    type="text"
                    name="city_of_birth"
                    placeholder="Enter City of Birth"
                    className="form-control rounded-0"
                    value={formData.city_of_birth}
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

              {/* Date of Birth */}
              <div style={{marginBottom: "10px"}}>
                <label><h5>Date of Birth</h5></label>
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

                  <i class="bi bi-calendar3"></i>

                  <input 
                    type="date"
                    name="date_of_birth"
                    placeholder="Enter Date of Birth"
                    className="form-control rounded-0"
                    value={formData.date_of_birth}
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

              {/* Gender */}
              <div style={{marginBottom: "10px"}}>
                <label><h5>Gender</h5></label>

                <div style={{ display: "flex", gap: "20px" }}>
                  {/* Male */}
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      style={{ display: "none" }} 
                    />

                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        border: "2px solid #5463A4",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "8px",
                      }}
                    >
                      {formData.gender === "Male" && (
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "#5463A4",
                            borderRadius: "50%",
                          }}
                        ></span>
                      )}
                    </span>
                    <i class="bi bi-person-standing"></i>
                    Male
                  </label>

                  {/* Female */}
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />

                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        border: "2px solid #5463A4",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "8px",
                      }}
                    >
                      {formData.gender === "Female" && (
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "#5463A4",
                            borderRadius: "50%",
                          }}
                        ></span>
                      )}
                    </span>
                    <i class="bi bi-person-standing-dress"></i>
                    Female
                  </label>
                </div>
              </div>
              
              {/* Username */}
               <div style={{marginBottom: "10px"}}>
              <label htmlFor="username">
                <h5>Username</h5>
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

              {/* Phone */}
              <div style={{marginBottom: "10px"}}>
                <label htmlFor="username">
                  <h5>Phone</h5>
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
                  <i class="bi bi-telephone" style={{ color: "#170C81", marginRight: "8px" }}></i>

                  <input
                    type="text"
                    placeholder="Enter phone"
                    name="phone"
                    value={formData.phone}
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

              {/* Email */}
              <div style={{marginBottom: "10px"}}>
                <label htmlFor="username">
                  <h5>Email</h5>
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
                  <i class="bi bi-envelope" style={{ color: "#170C81", marginRight: "8px" }}></i>

                  <input
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
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

              {/* Password */}
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

              {/* Verify Password */}
              <div style={{marginBottom: "10px"}}>
                <label htmlFor="username">
                  <h5>Verify Password</h5>
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
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    className="form-control rounded-0"
                    value={confirmPasword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      border: "none",
                      background: "transparent", 
                      padding: 0,
                      cursor: "pointer"
                    }}
                  >

                    <i className={showConfirmPassword ? "bi bi-unlock2" : "bi bi-lock"} style={{ color: "#170C81" }}></i>
                  </button>
                </div>
              </div>

              <p style={{textAlign: "center"}}>Have an account? <a href="/loginpatient">Log In</a></p>

              {/* button */}
              <button type="submit" style={{backgroundColor: "#170C81", border: "none"}} className="btn btn-success w-100 rounded-0">
                Register
              </button>
            </div>
          </form>
          
          
          
        </div>
      </div>
    </div>
  );
}

export default Regist;
