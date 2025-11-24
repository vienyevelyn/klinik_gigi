const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DoctorCategory = sequelize.define(
  "doctor_categories",
  {
    id_doctor_category: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
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
    tableName: "doctor_categories",
    timestamps: false, 
  }
);

module.exports = DoctorCategory;
