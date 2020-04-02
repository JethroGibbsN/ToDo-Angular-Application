const Sequelize = require('sequelize');
const sequelize = new Sequelize('assign', 'root', 'krish@2002', {
  host: 'localhost',
  port: "3306",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.customers = require('../models/tasks.model.js')(sequelize, Sequelize);


module.exports = db;