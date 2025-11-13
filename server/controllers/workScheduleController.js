const doctorController = require("./doctorController");
const WorkSchedule = require("../models/WorkScheduleModel");

async function getAllWorkSchedule(){
    try{
        const categories = await WorkSchedule.findAll();
        return categories;
    }
    catch(err){
        throw err;
    }

}

module.exports = {getAllWorkSchedule}