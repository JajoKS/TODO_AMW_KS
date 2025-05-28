// models/index.js

const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// Pobierz URL bazy z pliku .env
const databaseUrl = process.env.DB_URL;

app.use(cors("https://todo-amw-ks.onrender.com/"));
app.use(express.json());

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

db.Lists = require("./list")(sequelize, DataTypes);
db.Tasks = require("./task")(sequelize, DataTypes);

// Wywołanie metod associate (jeśli istnieją)
Object.keys(db).forEach((modelName) => {
  if (db[modelName] &&
      typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

db.authenticate = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("---------------Połączenie z bazą ok")
  } catch (err) {
    console.error("-----------Błąd połączenia z bazą")
  }
}

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