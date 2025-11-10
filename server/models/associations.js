const User = require('./userModel');
const UserDetail = require('./UserDetailModel');
const Patient = require('./PatientModel');


User.belongsTo(UserDetail, { foreignKey: 'id_userdetail' });
User.belongsTo(Patient, { foreignKey: 'id_patient'});


UserDetail.hasOne(User, { foreignKey: 'id_userdetail' });
Patient.hasOne(User, { foreignKey: 'id_patient' });

module.exports = { User, UserDetail, Patient };
