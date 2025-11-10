    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = require('../config/db');
    const phoneValidationRegex = /^\d{10,13}$/;


    const userModel = sequelize.define('users', {
        id_user: {
            type: DataTypes.STRING(5),
            primaryKey: true,
            allowNull: false,
        },
        id_userdetail: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'userdetails',
                key: 'id_userdetail'
            }
        },
        id_patient: {
            type: DataTypes.STRING(5),
            allowNull: true,
            references: {
                model: 'patients',
                key: 'id_patient'
            }
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING(13),
            allowNull: false,
            validate: {
            isValidPhone(value) {
                if (!phoneValidationRegex.test(value)) {
                throw new Error('Phone number must contain only digits (10–13)');
                }
            },
            },
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
        tableName: 'users', 
        timestamps: false, 
    });

    


    module.exports = userModel;
