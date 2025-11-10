
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust the path to your Sequelize config

const Patient = sequelize.define('patients', {
  id_patient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  blood_type: {
    type: DataTypes.STRING(3), 
    allowNull: true
  },
  height_cm: {
    type: DataTypes.FLOAT, 
    allowNull: true
  },
  weight_kg: {
    type: DataTypes.FLOAT, 
    allowNull: true
  },
  condition: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  emergency_contact_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  emergency_contact_number: {
    type: DataTypes.STRING(20),
    allowNull: true
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
}, {
  tableName: 'patients',
  timestamps: false, 
  
});

module.exports = Patient;
