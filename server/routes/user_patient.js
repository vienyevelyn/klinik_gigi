const express = require('express');
const router = express.Router();
const patientController = require("../controllers/patientController")
const appointmentController = require("../controllers/appointmentController")
const middleware = require("../middleware/verifyUser")

router.use(middleware.verifyUser);  
router.use(middleware.grantRole("patient"))


router.get("/doctorschedule", async (req, res)=>{
  try{
    const data = await appointmentController.getAllDoctorSchedule();
    console.log(data)
    return res.status(200).json(data);
  }
  catch(err){
    console.error('Error fetching user data:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get("/appointmentlist", async (req, res)=>{
  try{
    const data = await appointmentController.getAllAppointment(req.id_patient);
    console.log(data)
    return res.status(200).json(data);
  }
  catch(err){
    console.error('Error fetching user data:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post("/appointment", async (req, res)=>{
  try{
    const data = req.body;

    if (!data.id_doctor_schedule || !data.appointment_date || !data.appointment_time || !data.appointment_type) {
      return res.status(400).json({ message: "Data belum lengkap" });
    }

    const inputan = await appointmentController.bookAppointment( req.id_patient, data);
    
    console.log(inputan);
    return res.status(201).json({message:"Berhasil", data: inputan});

  }
  catch(err){
    console.error('Error in route:', err);
      return res.status(500).json({ error: "Failed to update admin" });
  }
  
})

router.delete("/appointmentlist/:id", async (req, res)=>{
  try{
    const { id } = req.params; 
    const data = await appointmentController.deleteAppointment(id);
    res.status(200).json(data);
  }
  catch (err) {
    console.error('Error in route:', err);
    res.status(500).json({ error: "Failed to update patient" });
  }
})


router.get('/profile', async (req, res) => {
  try{
     const id = req.id_patient;
    console.log(" Fetching user with ID:", id); 
    const data = await patientController.getUserFullData(id);
    console.log("Query result:", data);
    if(!data){
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(data);
  }
  catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put("/profile", async (req, res)=>{
  try{
    const id = req.id_patient;
    const data = await patientController.editPatient(id, req.body);
    res.status(200).json(data);
  }
  catch (err) {
    console.error('Error in route:', err);
    res.status(500).json({ error: "Failed to update patient" });
  }
})

module.exports = router;
