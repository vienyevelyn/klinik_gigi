const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const UserDetail = require('../models/UserDetailModel');
const Patient = require('../models/PatientModel');

async function findByUsername(username) {
    return await User.findOne(
        {
            where:{
                username
            }
        }
    );
}

async function createUserPatient(data){
    try{
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

        const hash = await bcrypt.hash(data.password.toString(), 10);

        const user = await User.create({
            id_user: id,
            username: data.username || '-',
            password: hash,
            email: data.email || '-',
            phone: data.phone || '-'
           
        });

        
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
            })

            await User.update(
                { id_patient: patient.id_patient },
                { where: { id_user: id } }
            )
       

        return user;

    }

    catch(err){
        throw err;
    }

}


async function createUserDetail(data) {
    try{
        let id = "";
        const checkempty = await UserDetail.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "UD001";
        }
        else{
            const last = await UserDetail.findOne({
                order: [["id_userdetail", "DESC"]]
            });
            if (!last || !last.id_userdetail) {
                id = "UD001";
            } else {
                const numPart = parseInt(last.id_userdetail.slice(2), 10);
                const newNum = isNaN(numPart) ? 1 : numPart + 1;
                id = "UD" + String(newNum).padStart(3, "0");
            }
        }


        const userDetail = await UserDetail.create({
            id_userdetail: id,
            NIK: data.NIK,
            first_name: data.first_name,
            last_name: data.last_name || '-',
            city_of_birth: data.city_of_birth || '-',
            date_of_birth: data.date_of_birth || '-',
            gender: data.gender || '-'
           
        });

        await User.update(
            {id_userdetail: userDetail.id_userdetail},
            {
                where:{
                    id_user: data.id_user
                }
            }
        )

        return userDetail;

    }

    catch(err){
        throw err;
    }

}



module.exports = {createUserPatient, findByUsername, createUserDetail}