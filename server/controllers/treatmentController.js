const Treatment = require('../models/TreatmentModel');

async function getAllTreatment() {
   try{
        const treatments = await Treatment.findAll();
        return treatments;
    }
    catch(err){
        throw err;
    } 
}

module.exports = {getAllTreatment};