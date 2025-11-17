const User = require('../models/userModel');
const UserDetail = require('../models/UserDetailModel');
const Patient = require('../models/PatientModel');
const sequelize = require("../config/db");

async function getUserFullData(id) {
  try{
    const data = await User.findByPk(id,
        {
            include: [UserDetail, Patient]
        }
    );
     
    


    if (!data) return null;

    return {
        id_user: data.id_user,
        username: data.username,
        email: data.email,
        phone: data.phone,
        first_name: data.user_detail?.first_name || '',
        last_name: data.user_detail?.last_name || '',
        NIK: data.user_detail?.NIK || '',
        city_of_birth: data.user_detail?.city_of_birth || '',
        date_of_birth: data.user_detail?.date_of_birth || '',
        gender: data.user_detail?.gender || '',
        photo: data.user_detail?.photo || '',
        height_cm: data.patient?.height_cm || '',
        weight_kg: data.patient?.weight_kg || '',
        blood_type: data.patient?.blood_type || '',
        condition: data.patient?.condition || '',
        emergency_contact_name: data.patient?.emergency_contact_name || '',
        emergency_contact_number: data.patient?.emergency_contact_number || ''
    };

  }
  catch(err){
    throw err;
  }
}

async function editPatient(id, data) {

  const data_user = await User.findByPk(id,
        {
            include: [UserDetail, Patient]
        }
  );

  if (!data) return null;

  const t = await sequelize.transaction();


  try{

    await User.update(
      {
        username: data.username,
        email: data.email,
        phone: data.phone,
      },
      { where: 
        { id_user: id }, 
        transaction: t 
      }
    );

    await UserDetail.update(
        {
          first_name: data.first_name,
          last_name: data.last_name,
          NIK: data.NIK,
          city_of_birth: data.city_of_birth,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          photo: data.photo,
        },
        { where: 
          { id_userdetail: data_user.id_userdetail }, 
          transaction: t 
        } 
    );

    await Patient.update(
        {
          height_cm: data.height_cm,
          weight_kg: data.weight_kg,
          blood_type: data.blood_type,
          condition: data.condition,
          emergency_contact_name: data.emergency_contact_name,
          emergency_contact_number: data.emergency_contact_number,
        },
        { where: 
          { id_patient: data_user.id_patient }, 
          transaction: t 
        } 
    );

    await t.commit();

    const updatedData = await getUserFullData(id);
    return updatedData;
  }
  catch(err){
    await t.rollback();
    console.error("Error updating patient data:", err);
    throw err;
  }
}



module.exports = { getUserFullData, editPatient };
