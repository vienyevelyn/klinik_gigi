const WorkSchedule = require("../models/WorkScheduleModel");
const Doctor = require("../models/DoctorModel");
const Patient = require("../models/PatientModel");
const DoctorSchedule = require("../models/DoctorScheduleModel");
const DoctorCategory = require("../models/DoctorCategoryModel");
const UserDetail = require("../models/UserDetailModel");
const User = require("../models/userModel");
const Appointment = require("../models/AppointmentModel");
const MedicalRecord = require("../models/MedicalRecordModel");

function timeToMinutes(timeStr) {
    const [h, m, s = 0] = timeStr.split(":").map(Number);
    return h * 60 + m + s / 60;
}




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


       
            const validasi = await Appointment.findAll({
                where: {
                    appointment_date: data.appointment_date,
                    status: "scheduled"
                }
            })

            const conflict = validasi.some(a=>{
                
                console.log("tes")
                
                const [year, month, day] = data.appointment_date.split('-').map(Number);
                const [year2, month2, day2] = a.appointment_date.split('-').map(Number);

                const [hours, minutes] = data.appointment_time.split(':').map(Number);
                const [hours2, minutes2, second] = a.appointment_time.split(':').map(Number);

                const date1 = new Date(Date.UTC(year, month - 1, day, hours, minutes))
                const date2 = new Date(Date.UTC(year2, month2 - 1, day2, hours2, minutes2, second))

                const diffMs = (date2 - date1)/ (1000 * 60 * 60);
                console.log(diffMs)

                if(diffMs > -1.5 && diffMs < 1.5){
                    return true
                }
                
            })

            if (conflict) {
                throw new Error("Jeda waktu harus satu setengah jam dari appointment");
            }

            const waktu = await DoctorSchedule.findOne({
                where: {id_doctor_schedule : data.id_doctor_schedule},
                include: [WorkSchedule]
            })
            
            const time1 = timeToMinutes(data.appointment_time);
            const time2 = timeToMinutes(waktu.work_schedule.start_time);
            const time3 = timeToMinutes(waktu.work_schedule.end_time);

            if (time1 < time2 || time1 > time3) {
                throw new Error("Di luar jam kerja. Mohon pilih ulang");
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

async function adminGetAllAppointment(){
     try{
        const apt = await Appointment.findAll({
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
                    },
                    
                
                ]
                },
                {
                    model: Patient
                }
              
            ],
            order: [["last_updated_at", "DESC"]]
        });
        return apt;
    }
    catch(err){
        throw err;
    }
}

async function statusAttend(id_a) {
    try{
        await Appointment.update({
            status: "attended",
            last_updated_at: new Date()
        },
        {
            where: {
                id_appointment: id_a
            },
        }
    );    

    const data =  await Appointment.findByPk(id_a,
        {
            include: [DoctorSchedule]
        }
    )

    if (!data) {
            throw new Error("Appointment not found");
    }

        let id = "";
        const checkempty = await MedicalRecord.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "MR001";
        }
        else{
            
            const last = await MedicalRecord.findOne({
                order: [["id_record", "DESC"]]
            });
                const newNum = parseInt(last.id_record.slice(2), 10) + 1;
                id = "MR" + String(newNum).padStart(3, '0');
                
            }
            
                const apt = await MedicalRecord.create({
                id_record: id,
                id_appointment: data.id_appointment,
                id_patient : data.id_patient,
                id_doctor : data.doctor_schedule.id_doctor,
                status: "incomplete"
            });

            return apt;         
            
    }
    catch(err){
        throw err;
    }
}
async function statusCancel(id) {
    try{
        const updated = await Appointment.update({
            status: "cancelled",
            last_updated_at: new Date()
        },
        {
            where: {
                id_appointment: id
            },
        });    



        return updated;

    }
    catch(err){
        throw err;
    }
}


module.exports = {getAllDoctorSchedule,bookAppointment, getAllAppointment, deleteAppointment, adminGetAllAppointment, statusAttend, statusCancel }