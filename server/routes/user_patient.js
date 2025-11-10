const express = require('express');
const router = express.Router();
const patientController = require("../controllers/patientController")

router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params; 
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

router.put("/:id", async (req, res)=>{
  try{
    const { id } = req.params; 
    const data = await patientController.editPatient(id, req.body);
    res.status(200).json(data);
  }
  catch (err) {
    console.error('Error in route:', err);
    res.status(500).json({ error: "Failed to update patient" });
  }
})

module.exports = router;
