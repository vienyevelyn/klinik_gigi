const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DoctorSchedule = sequelize.define(
  "doctor_schedules",
  {
    id_doctor_schedule: {
      type: DataTypes.STRING(6),
      primaryKey: true,
      allowNull: false,
    },
    id_doctor: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    id_work_schedule: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
 
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "doctor_schedules",
    timestamps: false,
  }
);

module.exports = DoctorSchedule;
