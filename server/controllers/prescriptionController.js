
const PrescriptionDetail = require('../models/PrescriptionDetailModel');
const MedicalRecord = require("../models/MedicalRecordModel");

async function getAllPrescription(id) {
    try{
        const psc = await PrescriptionDetail.findAll({
            where: {id_record: id},
            
        });
        return psc;
    }
    catch(err){
        throw err;
    }
    
}


async function createPrescription(id_record, data) {
    try{
        let id = "";
        const checkempty = await PrescriptionDetail.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "PD001";
        }
        else{
            
            const last = await PrescriptionDetail.findOne({
                order: [["id_prescription_detail", "DESC"]]
            });
                const newNum = parseInt(last.id_prescription_detail.slice(2), 10) + 1;
                id = "PD" + String(newNum).padStart(3, '0');
                
            }
            
            
            
            
                const apt = await PrescriptionDetail.create({
                id_prescription_detail: id,
                id_record: id_record,
                medicine_name: data.medicine_name,
                dosage: data.dosage,
                frequency: data.frequency,
                duration: data.duration,
                doctor_instruction: data.doctor_instruction,
                quantity_prescribe: data.quantity_prescribe,
            });
            return apt;

            
            
            
            }
            
    
    catch(err){
        throw err;
    }
}

async function updatePrescription( data) {
    try{
        const updated = await PrescriptionDetail.update({
            medicine_name: data.medicine_name,
            dosage: data.dosage,
            frequency: data.frequency,
            duration: data.duration,
            doctor_instruction: data.doctor_instruction,
            quantity_prescribe: data.quantity_prescribe,
            last_updated_at: Date.now() 
        },
        {
            where: {
                id_prescription_detail: data.id_prescription_detail
            }
        }
    );

        return updated;

    }
    catch(err){
        throw err;
    }
}

async function getRecordPrescription(id) {
    try{
        const psc = await PrescriptionDetail.findAll({
            where: { id_record: id }   
        });
        return psc;
    }
    catch(err){
        throw err;
    }
    
}

async function deletePrescription(idPK) {
    try{
        await PrescriptionDetail.destroy({
            where: {
                id_prescription_detail: idPK
            }
        });

        return true
    }
    catch(err){
        throw err;
    }
}
module.exports = {getAllPrescription, createPrescription, updatePrescription, getRecordPrescription, deletePrescription}