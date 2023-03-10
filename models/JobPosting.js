const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class JobPosting extends Model {}

JobPosting.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    date_posted: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    skill_tags: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'company',
            key: 'id',
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'posting',
  }
);

module.exports = JobPosting;