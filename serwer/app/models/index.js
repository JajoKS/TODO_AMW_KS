//const dbConfig = require("../config/db.config.js");

require('dotenv').config()
const { Sequelize } = require('sequelize');


// Pobierz URL bazy danych z pliku .env
const databaseUrl = process.env.DB_URL
const port = process.env.PORT

// Utwórz instancję Sequelize
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres', // Zmień na odpowiedni dialekt, np. 'postgres', 'sqlite'
  logging: false,   // Opcjonalnie: wyłącz logowanie zapytań SQL

});

// Test połączenia
sequelize.authenticate()
  .then(() => console.log('Połączono z bazą danych!'))
  .catch(err => console.error('Błąd połączenia:', err));

/*
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todo = require("./user.js")(sequelize, DataTypes);

db.authenticate = async () => {
  try {
    let t = await db.sequelize.authenticate();
    console.log("---------------Połączenie z bazą ok")
  } catch (err) {
    console.error("-----------Błąd połączenia z bazą")
  }
}

db.sync = async () => {
  try {
    let t = await db.sequelize.sync();
    console.log("--------Tabela utworzona");
  } catch (err) {
    console.error("-----------Nie można utworzyć tabeli: ", error);
  }
}

module.exports = db;
*/