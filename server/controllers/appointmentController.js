const WorkSchedule = require("../models/WorkScheduleModel");
const Doctor = require("../models/DoctorModel");
const DoctorSchedule = require("../models/DoctorScheduleModel");
const DoctorCategory = require("../models/DoctorCategoryModel");
const UserDetail = require("../models/UserDetailModel");
const User = require("../models/userModel");
const Appointment = require("../models/AppointmentModel");


async function getAllDoctorSchedule(){
    try{
        const schedile = await DoctorSchedule.findAll({
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

async function bookAppointment(id_patient, data) {
    try{
        let id = "";
        const checkempty = await Appointment.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "AP001";
        }
        else{
            
            const last = await Appointment.findOne({
                order: [["id_appointment", "DESC"]]
            });
                const newNum = parseInt(last.id_appointment.slice(2), 10) + 1;
                id = "AP" + String(newNum).padStart(3, '0');
                
            }
            
                const apt = await Appointment.create({
                id_appointment: id,
                id_doctor_schedule : data.id_doctor_schedule,
                id_patient : id_patient,
                appointment_date : data.appointment_date,
                appointment_time : data.appointment_time,
                appointment_type : data.appointment_type,
                patient_note : data.patient_note,
                status : "scheduled",
            });

            return apt;         
            
            }
            
    
    catch(err){
        throw err;
    }
}

async function getAllAppointment(id) {
    try{
        const apt = await Appointment.findAll({
            where:{
                id_patient : id,
                status: "scheduled"
            },
            include: [
                {
                model: DoctorSchedule,
                include: [
                    {
                        model: Doctor,
                        include: [{
                            model: User,
                            include: [UserDetail]
                        }]
                    },
                    {
                        model: WorkSchedule
                    }
                
                ]
                },
              
            ]
        }
        
        );
        return apt;
    }
    catch(err){
        throw err;
    }
}

async function deleteAppointment(idPK){
    try{
        await Appointment.destroy({
            where: {
                id_appointment: idPK
            }
        });

        return true
    }
    catch(err){
        throw err;
    }
}

module.exports = {getAllDoctorSchedule,bookAppointment, getAllAppointment, deleteAppointment }