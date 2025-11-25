const Treatment = require('../models/TreatmentModel');
const RecordTreatment = require('../models/RecordTreatmentModel');

async function getAllTreatment() {
   try{
        const treatments = await Treatment.findAll({
            where: {deleted_at: null}
        });
        return treatments;
    }
    catch(err){
        throw err;
    } 
}

async function createTreatment(data) {
    try{
        let id = "";
        const checkempty = await Treatment.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "TR001";
        }
        else{
            
            const last = await Treatment.findOne({
                order: [["id_treatment", "DESC"]]
            });
                const newNum = parseInt(last.id_treatment.slice(2), 10) + 1;
                id = "TR" + String(newNum).padStart(3, '0');
                
            }
            const treatmentSame = await Treatment.findOne({
                where: {
                    procedure_name: data.procedure_name
                },
            });
            
            if(treatmentSame){
                return false;
            }
            else{
                const apt = await Treatment.create({
                id_treatment: id,
                procedure_name: data.procedure_name,
                cost: data.cost
            });
            return apt;

            }
            
            
            }
            
    
    catch(err){
        throw err;
    }
}
async function updateTreatment(id, data) {
    try{
        const updated = await Treatment.update({
            procedure_name: data.procedure_name,
            cost: data.cost,
            last_updated_at: Date.now() 
        },
        {
            where: {
                id_treatment: id
            }
        }
    );

        return updated;

    }
    catch(err){
        throw err;
    }
}

async function treatment_patient(id_record, data) {
    try{
        let id = "";
        const checkempty = await RecordTreatment.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "RT001";
        }
        else{
            
            const last = await RecordTreatment.findOne({
                order: [["id_record_treatment", "DESC"]]
            });
                const newNum = parseInt(last.id_record_treatment.slice(2), 10) + 1;
                id = "RT" + String(newNum).padStart(3, '0');
                
            }
            
            
            
            
                const apt = await RecordTreatment.create({
                id_record_treatment: id,
                id_record: id_record,
                id_treatment: data.id_treatment
            });
            return apt;

            
            
            
            }
            
    
    catch(err){
        throw err;
    }
}

async function getAllRecordTreatment(id) {
   try{
        const treatments = await RecordTreatment.findAll({
            where: {id_record: id},
            include: [Treatment]
        });
        return treatments;
    }
    catch(err){
        throw err;
    } 
}

async function getAllPatientRecordTreatment(id) {
   try{
        const treatments = await RecordTreatment.findAll({
            where: {id_record: id},
            include: [Treatment]
        });
        return treatments;
    }
    catch(err){
        throw err;
    } 
}

async function deleteTreatment(id) {
    try{
        
        
        const updated = await Treatment.update({
            deleted_at: Date.now() 
        },
        {
            where: {
                id_treatment: id,
            }
        }
    );

        return updated;
    }
    catch(err){

    }
}


async function deleteDoctorTreatment(idPK) {
    try{
        await RecordTreatment.destroy({
            where: {
                id_record_treatment: idPK
            }
        });

        return true
    }
    catch(err){
        throw err;
    }
}
module.exports = {getAllTreatment, getAllRecordTreatment, createTreatment, updateTreatment, treatment_patient, getAllPatientRecordTreatment, deleteTreatment, deleteDoctorTreatment};