const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) =>{
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ Error: "You are not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ Error: "Token is invalid" });

    req.username = decoded.username;
    req.role = decoded.role;
    req.id_patient = decoded.id_patient || null;
    req.id_doctor = decoded.id_doctor || null;
    req.id_admin = decoded.id_admin || null;

    next();
  });
}

const grantRole = (roles)=>{
    return (req, res, next) =>{
        if (req.role !== roles) {
             return res.status(403).json({Error: "Anda tidak memiliki akses"})
        }
        next();
    }
}

module.exports = {verifyUser, grantRole};