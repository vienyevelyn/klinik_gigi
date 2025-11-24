const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PrescriptionDetail = sequelize.define(
  "prescription_details",
  {
    id_prescription_detail: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    id_record: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    medicine_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    doctor_instruction: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    quantity_prescribe: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    last_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "prescription_details",
    timestamps: false,
  }
);

module.exports = PrescriptionDetail;
