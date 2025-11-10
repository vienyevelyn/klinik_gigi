const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const userDetailModel = sequelize.define('user_details', {
    id_userdetail: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },  
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,       
    },
    NIK: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_of_birth:{
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
        validate:{
            isIn: [["Male", "Female"]]
        }
    },
    photo: {
        type: DataTypes.BLOB('long'), 
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
        defaultValue: null,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    }, {
    tableName: 'user_details', 
    timestamps: false, 
});



module.exports = userDetailModel;
