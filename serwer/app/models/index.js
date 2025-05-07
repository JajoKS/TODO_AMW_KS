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

db.authenticate = async () => {
  try {
    let t = await db.sequelize.authenticate();
    console.log("---------------Połączenie z bazą ok")
  } catch (err) {
    console.error("-----------Błąd połączenia z bazą")
  }
}
db.Lists = require("./list")(sequelize, DataTypes);

// Funkcja synchronizacji bazy
db.sync = async () => {
  try {
    await sequelize.sync();
    console.log("Synchronizacja bazy zakończona");
  } catch (error) {
    console.error("Błąd synchronizacji:", error);
  }
};

module.exports = db;