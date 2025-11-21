const doctorController = require("./doctorController");
const WorkSchedule = require("../models/WorkScheduleModel");
const Doctor = require("../models/DoctorModel");
const DoctorSchedule = require("../models/DoctorScheduleModel");
const DoctorCategory = require("../models/DoctorCategoryModel");
const UserDetail = require("../models/UserDetailModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");

async function getAllWorkSchedule(){
    try{
        const categories = await WorkSchedule.findAll();
        return categories;
    }
    catch(err){
        throw err;
    }

}

async function availableWorkSchedule(){
    try{
        const categories = await WorkSchedule.findAll({
            where: {
                status: "Available"
            }
        });
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

async function getDoctorSchedule(id){
    try{
        const schedile = await DoctorSchedule.findAll({
            where: {
                id_doctor: id,
                deleted_at : {[Op.is]: null}
            },
            include: [{
                model: WorkSchedule,
                attributes:[
                    "id_work_schedule",
                    "day_of_the_week",
                    "start_time",
                    "end_time",
                    "room"
                ]
            },
            {
                model: Doctor,
                include:[
                   {
                    model: DoctorCategory,
                    attributes: ["name"]      
                   },
                   {
                    model: User,
                    include: [
                       {
                            model: UserDetail,
                           
                       }
                    ]
                   }
                ]
            }
        
        ]
        });
        console.log(schedile)
        return schedile;
    }
    catch(err){
        throw err;
    }

}

async function bookSchedule(id_d, data) {
    try{
        const updated = await WorkSchedule.update({
            status: "Taken",
            last_updated_at: new Date()
        },
        {
            where: {
                id_work_schedule: data.id_ws
            },
        });   
        
         
            let id = "";
            const checkempty = await DoctorSchedule.findAndCountAll();
            console.log(checkempty);
            if(checkempty.count <= 0){
                id = "DS001";
            }
            else{
                
                const last = await DoctorSchedule.findOne({
                    order: [["id_doctor_schedule", "DESC"]]
                });
                    const newNum = parseInt(last.id_doctor_schedule.slice(2), 10) + 1;
                    id = "DS" + String(newNum).padStart(3, '0');
                    
                }
                
                    const apt = await DoctorSchedule.create({
                    id_doctor_schedule: id,
                    id_work_schedule: data.id_ws,
                    id_doctor: id_d,
                    
                });

                return apt;         
                


    }
    catch(err){
        throw err;
    }
}

async function dropSchedule(id, id_ws) {
    try{
      const ds = await DoctorSchedule.update(
        { deleted_at: new Date() },
        {
            where: {
            id_work_schedule: id_ws,
            id_doctor: id
            }
        }
    )

      const ws = await WorkSchedule.update(
        { status: "Available" },
        {
            where: {
            id_work_schedule: id_ws
            }
        }
      )

    }
    catch(err){
        throw err;
    }
}


module.exports = {getAllWorkSchedule, createWorkSchedule, updateWorkSchedule, availableWorkSchedule, getDoctorSchedule, bookSchedule, dropSchedule}