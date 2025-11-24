const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Prescription = sequelize.define(
  "prescriptions",
  {
    id_prescription: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    id_record: {
      type: DataTypes.STRING(5),
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
    tableName: "prescriptions",
    timestamps: false,
  }
);

module.exports = Prescription;
