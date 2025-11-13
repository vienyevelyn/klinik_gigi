const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController")
const doctorCategoryController = require("../controllers/doctorCategoryController")
const workScheduleController = require("../controllers/workScheduleController")

router.get("/doctorcategory", async (req, res)=>{
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

router.post("/doctorcategory", async (req, res) =>{
  const data = req.body;
  if (!data.name || !data.description) {
    return res.status(400).json({message: "Data belum diisi lengkap"})
  }
  try{
    const inputan = await doctorCategoryController.createCategory(data);

    if (inputan === false) {
      return res.status(409).json({ message: "Nama kategori sudah ada" });
    }

    console.log(inputan);
    return res.status(201).json({message:"Berhasil", data: inputan});
  }
  catch(err){
    console.error('Error in route:', err);
    return res.status(500).json({ error: "Failed to insert admin" });
  }
})

router.get("/workschedule", async (req, res)=>{
  try{
    const data = await workScheduleController.getAllWorkSchedule();
    console.log(data)
    return res.status(200).json(data);
  }
  catch(err){
    console.error('Error fetching user data:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params; 
    console.log(" Fetching user with ID:", id); 
    const data = await adminController.getUserFullData(id);
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

router.put("/:id", async (req, res)=>{
  try{
    const { id } = req.params; 
    const data = await adminController.editAdmin(id, req.body);
    res.status(200).json(data);
  }
  catch (err) {
    console.error('Error in route:', err);
    res.status(500).json({ error: "Failed to update admin" });
  }
})



module.exports = router;
