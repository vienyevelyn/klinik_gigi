const express = require('express');
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const middleware = require("../middleware/verifyUser");
const doctorCategoryController = require("../controllers/doctorCategoryController")

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

module.exports = router;
