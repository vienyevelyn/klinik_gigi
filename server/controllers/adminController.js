const User = require('../models/userModel');
const UserDetail = require('../models/UserDetailModel');
const sequelize = require("../config/db");
const { where } = require('sequelize');

async function getUserFullData(id) {
  try{
    const data = await User.findOne(
        {
            where: {id_admin: id},
            include: [UserDetail]
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
        photo: data.user_detail?.photo || ''
    };

  }
  catch(err){
    throw err;
  }
}

async function editAdmin(id, data) {

  const data_user = await User.findOne(
        { 
          where: {id_admin: id},
          include: [UserDetail]
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
        { id_admin: id }, 
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
module.exports = { getUserFullData, editAdmin };
