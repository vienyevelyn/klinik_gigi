// Import all models
const User = require('./userModel');
const UserDetail = require('./UserDetailModel');
const Patient = require('./PatientModel');
const Doctor = require('./DoctorModel');
const DoctorCategory = require('./DoctorCategoryModel');
const DoctorSchedule = require('./DoctorScheduleModel');
const WorkSchedule = require('./WorkScheduleModel');
const Appointment = require('./AppointmentModel');
const MedicalRecord = require('./MedicalRecordModel');
const Treatment = require('./TreatmentModel');
const RecordTreatment = require('./RecordTreatmentModel');



Appointment.belongsTo(DoctorSchedule, {
  foreignKey: "id_doctor_schedule",
});

DoctorSchedule.hasMany(Appointment, {
  foreignKey: "id_doctor_schedule",
});

Appointment.belongsTo(Patient, {
  foreignKey: "id_patient",
});

Patient.hasMany(Appointment, {
  foreignKey: "id_patient",
});


User.belongsTo(UserDetail, {
  foreignKey: "id_userdetail",
  targetKey: "id_userdetail"
});

UserDetail.hasOne(User, {
  foreignKey: "id_userdetail",
  sourceKey: "id_userdetail"
});

User.belongsTo(Patient, {
  foreignKey: "id_patient",
  targetKey: "id_patient"
});

Patient.hasOne(User, {
  foreignKey: "id_patient",
  sourceKey: "id_patient"
});


Doctor.hasOne(User, {
  foreignKey: "id_doctor",
  sourceKey: "id_doctor"
});

User.belongsTo(Doctor, {
  foreignKey: "id_doctor",
  targetKey: "id_doctor"
});




Doctor.belongsTo(DoctorCategory, {
  foreignKey: "id_doctor_category"
});

DoctorCategory.hasMany(Doctor, {
  foreignKey: "id_doctor_category"
});



Doctor.belongsToMany(WorkSchedule, {
  through: DoctorSchedule,
  foreignKey: "id_doctor",
  otherKey: "id_work_schedule"
});

WorkSchedule.belongsToMany(Doctor, {
  through: DoctorSchedule,
  foreignKey: "id_work_schedule",
  otherKey: "id_doctor"
});



DoctorSchedule.belongsTo(Doctor, { foreignKey: "id_doctor" });
Doctor.hasMany(DoctorSchedule, { foreignKey: "id_doctor" });

DoctorSchedule.belongsTo(WorkSchedule, { foreignKey: "id_work_schedule" });
WorkSchedule.hasMany(DoctorSchedule, { foreignKey: "id_work_schedule" });


MedicalRecord.belongsTo(Patient, {
  foreignKey: "id_patient"
});

Patient.hasMany(MedicalRecord, {
  foreignKey: "id_patient"
});

MedicalRecord.belongsTo(Doctor, {
  foreignKey: "id_doctor"
});

Doctor.hasMany(MedicalRecord, {
  foreignKey: "id_doctor"
});

MedicalRecord.belongsTo(Appointment, {
  foreignKey: "id_appointment"
});

Appointment.hasOne(MedicalRecord, {
  foreignKey: "id_appointment"
});

// MedicalRecord -> RecordTreatment
MedicalRecord.hasMany(RecordTreatment, {
    foreignKey: "id_record",
    sourceKey: "id_record",
});

RecordTreatment.belongsTo(MedicalRecord, {
    foreignKey: "id_record",
    targetKey: "id_record",
});

Treatment.hasMany(RecordTreatment, {
    foreignKey: "id_treatment",
    sourceKey: "id_treatment",
});

RecordTreatment.belongsTo(Treatment, {
    foreignKey: "id_treatment",
    targetKey: "id_treatment",
});




module.exports = {
  User,
  UserDetail,
  Patient,
  Doctor,
  WorkSchedule,
  DoctorSchedule,
  DoctorCategory,
  Treatment,
  RecordTreatment
};
