const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const UserDetail = require('../models/UserDetailModel');
const Patient = require('../models/PatientModel');
const sequelize = require('../config/db');

async function findByUsername(username) {
    return await User.findOne(
        {
            where:{
                username
            }
        }
    );
}


async function createUserandDetail(data) {
    const t = await sequelize.transaction()
    try{
        const  exist = await findByUsername(data.username);
        if(exist){
            throw new Error("Username already exists");
        }

        let id = "";
        const checkempty = await User.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "US001";
        }
        else{
            const last = await User.findOne({
                order: [["id_user", "DESC"]]
            });
            if (!last || !last.id_user) {
                id = "US001";
            } else {
                const numPart = parseInt(last.id_user.slice(2), 10);
                const newNum = isNaN(numPart) ? 1 : numPart + 1;
                id = "US" + String(newNum).padStart(3, "0");
            }
        }
        
        let idpatient = "";
        const checkemptyp = await Patient.findAndCountAll();
        console.log(checkemptyp);
        if(checkemptyp.count <= 0){
            idpatient = "PS001";
        }
        else{
            const last = await Patient.findOne({
                order: [["id_patient", "DESC"]]
            });
            console.log(last);
            const newNum = parseInt(last.id_patient.slice(2), 10) + 1;
            idpatient = "PS" + String(newNum).padStart(3, '0');
        }

        const patient = await Patient.create({
            id_patient: idpatient
        }, { transaction: t })

        const hash = await bcrypt.hash(data.password.toString(), 10);



        const existNIK = await UserDetail.findOne({where: {NIK: data.NIK}})

        if(existNIK){
            throw new Error("NIK already exists");
        }

        let id_detail = "";
        const checkempty2 = await UserDetail.findAndCountAll();
        console.log(checkempty2);
        if(checkempty2.count <= 0){
            id_detail = "UD001";
        }
        else{
            const last = await UserDetail.findOne({
                order: [["id_userdetail", "DESC"]]
            });
            if (!last || !last.id_userdetail) {
                id_detail = "UD001";
            } else {
                const numPart = parseInt(last.id_userdetail.slice(2), 10);
                const newNum = isNaN(numPart) ? 1 : numPart + 1;
                id_detail = "UD" + String(newNum).padStart(3, "0");
            }
        }

        const userDetail = await UserDetail.create({
            id_userdetail: id_detail,
            NIK: data.NIK,
            first_name: data.first_name,
            last_name: data.last_name || '-',
            city_of_birth: data.city_of_birth || '-',
            date_of_birth: data.date_of_birth || '-',
            gender: data.gender || '-',
            id_user: user.id_user
        }, { transaction: t });

        const user = await User.create({
            id_user: id,
            username: data.username || '-',
            password: hash,
            email: data.email || '-',
            phone: data.phone || '-',
            id_patient: patient.id_patient,
            id_userdetail : userDetail.id_userdetail
        }, {transaction: t});

        await t.commit();

        return { 
            user: user.toJSON(), 
            patient: patient.toJSON(), 
            userDetail: userDetail.toJSON() 
        };
        
    }catch(err){
        await t.rollback();
        throw err;
    }

}





module.exports = {findByUsername, createUserandDetail}