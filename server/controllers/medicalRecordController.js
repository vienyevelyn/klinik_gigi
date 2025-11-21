const MedicalRecord = require('../models/MedicalRecordModel');
const Patient = require('../models/PatientModel');
const User = require('../models/userModel');
const UserDetail = require('../models/UserDetailModel');

async function getAllIncompleteRecord(id){
    try{
        const record = await MedicalRecord.findAll({
            where: { status: "incomplete", id_doctor: id },
            include: [
                {
                    model: Patient,
                    include: [
                        {
                            model: User,
                            include: [UserDetail]
                        }
                    ]
                }
            ]
        });

        if (!record) return null;

        return Promise.all(
            record.map(async (data) => {

                const user = await User.findOne({
                    where: { id_patient: data.id_patient },
                    include: [UserDetail]
                });
                console.log(user.user_detail?.last_name)
                return {
                    id_record: data.id_record,
                    id_appointment: data.id_appointment,

                    first_name: user.user_detail?.first_name,
                    last_name: user.user_detail?.last_name,

                    symptom: data.symptom || "",
                    diagnosis: data.diagnosis || "",
                    doctor_note: data.doctor_note || "",
                    status: data.status || "incomplete",
                };
            })
        );

    } catch (err) {
        throw err;
    }
}

async function getAllCompleteRecord(id){
    try{
        const record = await MedicalRecord.findAll({
            where: { status: "complete", id_doctor: id },
            include: [
                {
                    model: Patient,
                    include: [
                        {
                            model: User,
                            include: [UserDetail]
                        }
                    ]
                }
            ]
        });

        if (!record) return null;

        return Promise.all(
            record.map(async (data) => {

                const user = await User.findOne({
                    where: { id_patient: data.id_patient },
                    include: [UserDetail]
                });
                console.log(user.user_detail?.last_name)
                return {
                    id_record: data.id_record,
                    id_appointment: data.id_appointment,

                    first_name: user.user_detail?.first_name,
                    last_name: user.user_detail?.last_name,

                    symptom: data.symptom || "",
                    diagnosis: data.diagnosis || "",
                    doctor_note: data.doctor_note || "",
                    status: data.status || "complete",
                };
            })
        );

    } catch (err) {
        throw err;
    }
}

async function editRecord(id, data) {

    try{
        const rec = await MedicalRecord.update({
            symptom: data.symptom,
            diagnosis: data.diagnosis,
            doctor_note: data.doctor_note
        }, {
            where: {id_record: data.id_record}
        })

        const updated = await MedicalRecord.findOne({
            where: { id_record: data.id_record }
        });
        console.log("testing")
        console.log(updated)
        
        if(updated.symptom?.trim() && updated.diagnosis?.trim() && updated.doctor_note?.trim()){
            await MedicalRecord.update({
                status: "complete"
            },{
                where: {id_record: updated.id_record}
            })
        }

        getAllIncompleteRecord(id);

        return updated;

    }
    catch(err){
        throw err;
    }
    
}

module.exports = { getAllIncompleteRecord, editRecord, getAllCompleteRecord };
