// models/index.js

const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// Pobierz URL bazy z pliku .env
const databaseUrl = process.env.DB_URL;

// Utwórz instancję Sequelize
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false, // opcjonalnie, wyłącza logi SQL
  // Jeśli Twoja baza wymaga SSL, możesz dodać opcje:
  dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false
     }
   }
});

// Utwórz obiekt, który będzie eksportowany
const db = {
    Sequelize,
    sequelize
};

module.exports = db;