const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const sequelize = new Sequelize(dbDatabase, dbUserName, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
});

module.exports = sequelize;