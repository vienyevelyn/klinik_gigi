const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WorkSchedule = sequelize.define(
  "work_schedules",
  {
    id_work_schedule: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    day_of_the_week: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Available", "Taken"),
      allowNull: false,
      defaultValue: "Available",
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
    },
  },
  {
    tableName: "work_schedules",
    timestamps: false, // disable auto timestamps since you already have custom date fields
    freezeTableName: true,
  }
);

module.exports = WorkSchedule;
