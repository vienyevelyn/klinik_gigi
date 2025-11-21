const { Sequelize, DataTypes, DATE } = require("sequelize");
const sequelize = require("../config/db");

const MedicalRecord = sequelize.define("medical_records", {
  id_record: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false,
  },

  id_appointment: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },

  id_patient: {        
    type: DataTypes.STRING(5),
    allowNull: false,
  },

  id_doctor: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },

  symptom: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  diagnosis: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  doctor_note: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  last_updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    
  },

  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: "medical_records",
  timestamps: false,
});

module.exports = MedicalRecord;
