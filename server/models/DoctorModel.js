const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Doctor = sequelize.define('doctors', {
    id_doctor: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
    },
    id_doctor_category: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    medical_license: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    certificate_degree: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    specialization_certificate: {
        type: DataTypes.STRING(255),
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
    tableName: 'doctors',
    timestamps: false,   
});

module.exports = Doctor;
