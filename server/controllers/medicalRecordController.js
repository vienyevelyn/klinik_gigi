const MedicalRecord = require('../models/MedicalRecordModel');
const Patient = require('../models/PatientModel');

async function getAllIncompleteRecord(id){
    try{
        const record = await MedicalRecord.findAll({
            where: {status: "incomplete", id_doctor: id},
            include: [Patient]
        });
        if (!record) return null;

        return record.map((data) => ({
        id_record: data.id_record,
        id_appointment: data.id_appointment,

        patient_name: data.patient?.name || "",

        symptom: data.symptom || "",
        diagnosis: data.diagnosis || "",
        doctor_note: data.doctor_note || "",
        status: data.status || "incomplete",
    }));
    }
    catch(err){
        throw err;
    }

}
module.exports = {getAllIncompleteRecord}