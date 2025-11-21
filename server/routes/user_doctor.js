const express = require('express');
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const middleware = require("../middleware/verifyUser");
const doctorCategoryController = require("../controllers/doctorCategoryController")
const workScheduleController = require("../controllers/workScheduleController")
const medicalRecordController = require("../controllers/medicalRecordController")

router.use(middleware.verifyUser);
router.use(middleware.grantRole("doctor"));


router.get('/profile', async (req, res) => {
  try {
    const id = req.id_doctor;
    console.log("Fetching doctor with ID:", id);
    const data = await doctorController.getUserFullData(id);
    console.log("Query result:", data);

    if (!data) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching doctor data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const id = req.id_doctor;
    const data = await doctorController.editDoctor(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error updating doctor profile:', err);
    res.status(500).json({ error: "Failed to update doctor profile" });
  }
});

router.get("/categories", async (req, res)=>{
  try{
    const data = await doctorCategoryController.getAllCategory();
    console.log(data)
    return res.status(200).json(data);
  }
  catch(err){
    console.error('Error fetching user data:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get("/workschedule", async (req, res)=>{
  try{
    const data = await workScheduleController.availableWorkSchedule();
    console.log(data)
    return res.status(200).json(data);
  }
  catch(err){
    console.error('Error fetching user data:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/currentschedule', async (req, res) => {
  try {
    const id = req.id_doctor;
    console.log("Fetching doctor with ID:", id);
    const data = await workScheduleController.getDoctorSchedule(id);
    console.log("Query result:", data);

    if (!data) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching doctor data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post("/workschedule", async (req, res)=>{
  const data = req.body;
  const id = req.id_doctor;
    if ( !data.id_ws) {
      return res.status(400).json({message: "Data belum diisi lengkap"})
    }
    try{
      const inputan = await workScheduleController.bookSchedule(id, data);
  
      console.log(inputan);
      return res.status(201).json({message:"Berhasil", data: inputan});
    }
    catch(err){
      console.error('Error in route:', err);
      return res.status(500).json({ error: "Failed to insert admin" });
    }
})

router.put("/currentschedule", async (req, res)=>{
  const data = req.body;
  const id = req.id_doctor;
    if ( !data.id_ws) {
      return res.status(400).json({message: "Data belum diisi lengkap"})
    }
    try{
      const inputan = await workScheduleController.dropSchedule(id, data.id_ws);
  
      console.log(inputan);
      return res.status(200).json({message:"Berhasil", data: inputan});
    }
    catch(err){
      console.error('Error in route:', err);
      return res.status(500).json({ error: "Failed to delete admin" });
    }
})

router.get("/record", async(req, res)=>{

  try {
    // const data = req.body;

    // if(!data.symptom || !data.diagnosis || !data.doctor_note){
    //   return res.status(400).json({message: "Data belum diisi lengkap"})
    // }
    const id = req.id_doctor;
    console.log("Fetching doctor with ID:", id);
    const inputan = await medicalRecordController.getAllIncompleteRecord(id);
    console.log("Query result:", inputan);

    if (!inputan) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(inputan);
  } catch (err) {
    console.error('Error fetching doctor data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
})

module.exports = router;
