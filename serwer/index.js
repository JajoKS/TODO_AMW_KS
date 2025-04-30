// index.js
require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Pobierz URL bazy danych z pliku .env
const databaseUrl = process.env.DB_URL; // np.: postgres://username:password@hostname:5432/databasename

// Inicjalizacja instancji Sequelize
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  // Jeśli baza wymaga SSL, odkomentuj poniższe linie:
   dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false,
     }
   }
});

// Definicja modelu "Lists" do tworzenia tabeli
const Lists = sequelize.define('lists', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,  // tytuł nie może być pusty
  },
  description: {
    type: DataTypes.STRING,
  },
  check: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

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

// Endpoint zwracający wszystkie rekordy z tabeli "lists"
app.get('/select-all', async (req, res) => {
  try {
    const results = await Lists.findAll();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
