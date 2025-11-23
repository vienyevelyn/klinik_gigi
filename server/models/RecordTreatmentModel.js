const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // adjust path if needed

const RecordTreatment = sequelize.define(
  "record_treatments",
  {
    id_record_treatment: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false
    },
    id_record: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    id_treatment: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW

    },
    last_updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "record_treatments",
    timestamps: false 
    }
);

module.exports = RecordTreatment;
