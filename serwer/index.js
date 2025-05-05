// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const corsDomain = {
  origin: 'https://todo-amw-ks.onrender.com/'
}

const app = express();
app.use(cors()); // Umożliwienie CORS dla wszystkich tras
app.use(express.json());

// Pobierz URL bazy danych z pliku .env
const databaseUrl = process.env.DB_URL; // np.: postgres://username:password@hostname:5432/databasename

// Inicjalizacja instancji Sequelize
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  // Jeśli baza wymaga SSL |
  //                       V
   dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false,
     }
   }
});

//Działa tak, jakby pobrało się funkcje/zmienne do jednej zmiennej/obiektu?
const Lists = require('./app/models/list')(sequelize,DataTypes);

// Synchronizacja modelu oraz wstawienie przykładowego wiersza, jeśli tabela jest pusta
sequelize.sync()
  .then(async () => {
    console.log("Tabela 'lists' zsynchronizowana.");
    
    // Sprawdź, czy tabela jest pusta
    const count = await Lists.count();
    if (count === 0) {
      // Wstaw przykładowy wiersz
      await Lists.create({
        title: "Przykładowy tytuł",
        description: "Przykładowy opis",
        check: true,
      });
      console.log("Przykładowy wiersz został dodany.");
    } else {
      console.log("Tabela zawiera już dane, przykładowy wiersz nie został dodany.");
    }
  })
  .catch(error => console.error("Błąd synchronizacji tabeli:", error));

const db = require("./app/models");

db.authenticate();
db.sync();

// Endpoint zwracający wszystkie rekordy z tabeli "lists"
app.get('/select-all', async (req, res) => {
  try {
    const results = await Lists.findAll();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

require("./app/routes/todo.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
