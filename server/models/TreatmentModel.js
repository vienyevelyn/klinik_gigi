const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust the path to your Sequelize instance

const TreatmentModel = sequelize.define('treatments', {
  id_treatment: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false
  },
  procedure_name: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
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
    allowNull: true
  }
}, {
  tableName: 'treatments',
  timestamps: false, 
 
});

module.exports = TreatmentModel;
