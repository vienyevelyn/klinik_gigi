const User = require('./userModel');
const UserDetail = require('./UserDetailModel');
const Patient = require('./PatientModel');
const Doctor = require('./DoctorModel');
const DoctorCategory = require('./DoctorCategoryModel');


User.belongsTo(UserDetail, { foreignKey: 'id_userdetail' });
User.belongsTo(Patient, { foreignKey: 'id_patient'});
User.belongsTo(Doctor, { foreignKey: 'id_doctor'});


UserDetail.hasOne(User, { foreignKey: 'id_userdetail' });
Doctor.hasOne(User, { foreignKey: 'id_doctor' });


Doctor.belongsTo(DoctorCategory, { foreignKey: 'id_doctor_category'});
DoctorCategory.hasOne(Doctor, { foreignKey: 'id_doctor_category' });



module.exports = { User, UserDetail, Patient, Doctor };
