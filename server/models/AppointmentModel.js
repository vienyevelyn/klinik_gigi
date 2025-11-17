const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appointment = sequelize.define('appointments', {
    id_appointment: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
    },
    id_doctor_schedule: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    id_patient: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    appointment_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    patient_note: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'cancelled', 'doctor approval', 'completed'),
        allowNull: false,
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    last_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
},
{
    tableName: 'appointments',
    timestamps: false,
});

module.exports = Appointment;
