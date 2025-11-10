const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const sequelize = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const patientRoutes = require("./routes/user_patient");

require('./models/associations');
const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true, 
}));
app.use(cookieParser());


sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));

sequelize.sync();

app.post("/login", async (req, res)=>{
  const {username, password} = req.body;
  if(!username || !password){
    return res.status(400).json({ message: "All fields are required" });
  }
  try{
    const data = await userController.findByUsername(username);

    if(!data){
      return res.status(404).json({ Status: "Fail", message: "User not found" });
    }
    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      return res.status(401).json({ Status: "Fail", message: "Incorrect password" });
    }

    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "1d"});
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
    return res.json({ Status: "Success", message: "Login successful" });

  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const verifyUser = (req, res, next) =>{
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ Error: "You are not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ Error: "Token is invalid" });

    req.username = decoded.username;
    next();
  });
}
app.get("/", verifyUser, (req, res)=>{
  return res.json({ Status: "Success", username: req.username });
});

app.post("/register", async (req, res)=>{
  
  const { 
    username,
    email,
    phone,
    password,
    nik,
    first_name,
    last_name,
    city_of_birth,
    date_of_birth,
    gender } = req.body;

   if (!username || !email || !phone || !password || !nik || !first_name || !date_of_birth || !city_of_birth  || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try{
    const newUser = await userController.createUserPatient({ username, email, phone, password });

    const newUserDetail = await userController.createUserDetail({id_user: newUser.id_user, NIK: nik, first_name, last_name, city_of_birth, date_of_birth, gender});
    return res.status(201).json({ Status: "Success", message: "User registered successfully", user: newUser, userDetail: newUserDetail });


  }
  catch(err){
    console.error(err);
    return res.status(500).json({ Status: "Fail", message: "Server error", error: err.message });
  }

  

  
});

app.get("/logout", (req, res)=>{
  res.clearCookie("token");
  return res.json({Status: "Success"})
});


// patient
app.use('/patient', patientRoutes);


app.listen(port, ()=>{
    console.log(`server is running http://localhost:${port}`);
});
