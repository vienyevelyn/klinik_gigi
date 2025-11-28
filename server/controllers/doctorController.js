const User = require('../models/userModel');
const UserDetail = require('../models/UserDetailModel');
const Doctor = require('../models/DoctorModel');
const DoctorCategory = require('../models/DoctorCategoryModel');

const sequelize = require("../config/db");

async function getUserFullData(id) {
  try{
    const data = await User.findOne(
        {
            where: {id_doctor: id},
            include: [UserDetail, 
              { model: Doctor, include: [DoctorCategory] }
            ]
        },
       
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
        id_doctor_category: data.doctor?.id_doctor_category || '',
        doctor_category_name: data.doctor?.doctor_category?.name || '',
        medical_license: data.doctor?.medical_license || '',
        certificate_degree: data.doctor?.certificate_degree || '',
        specialization_certificate: data.doctor?.specialization_certificate || '',
        CV: data.doctor?.CV || ''
    };

  }
  catch(err){
    throw err;
  }
}

async function editDoctor(id, data) {

  const data_user = await User.findOne(
        { 
          where: {id_doctor: id},
          include: [UserDetail, Doctor]
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
        { id_doctor: id }, 
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
    await Doctor.update(
      {
        id_doctor_category: data.id_doctor_category,
        medical_license: data.medical_license,
        certificate_degree: data.certificate_degree,
        specialization_certificate: data.specialization_certificate,
      },
      {
        where: { id_doctor: data_user.id_doctor  },
        transaction: t
      }
    );

 

    await t.commit();

    const updatedData = await getUserFullData(id);
    return updatedData;
  }
  catch(err){
    await t.rollback();
    console.error("Error updating admin data:", err);
    throw err;
  }


}

async function createDoctor(data) {
  
}

module.exports = { getUserFullData, editDoctor };
