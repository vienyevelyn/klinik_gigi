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


async function createWorkSchedule(data) {
    try{
        let id = "";
        const checkempty = await WorkSchedule.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "WS001";
        }
        else{
            
            const last = await WorkSchedule.findOne({
                order: [["id_work_schedule", "DESC"]]
            });
                const newNum = parseInt(last.id_work_schedule.slice(2), 10) + 1;
                id = "WS" + String(newNum).padStart(3, '0');
                
            }
            
                const apt = await WorkSchedule.create({
                id_work_schedule: id,
                day_of_the_week : data.day_of_the_week,
                start_time : data.start_time,
                end_time : data.end_time,
                room : data.room,
                status : data.status,
            });

            await getAllWorkSchedule();
            return apt;

            
            
            
            }
            
    
    catch(err){
        throw err;
    }
}

async function updateWorkSchedule(id, data) {
   try {const apt = await WorkSchedule.update({
                day_of_the_week : data.day_of_the_week,
                start_time : data.start_time,
                end_time : data.end_time,
                room : data.room,
                status : data.status,
                last_updated_at: Date.now()
            },
        {
            where: {
                id_work_schedule: id
            }
        });

         await getAllWorkSchedule();
            return apt;}
    catch(err){
        throw err;
     }

}
module.exports = {getAllWorkSchedule, createWorkSchedule, updateWorkSchedule}