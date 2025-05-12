// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./app/models/index');
const { Lists, Tasks } = db; // Używamy właściwych nazw modeli
//const { Sequelize, DataTypes } = require('sequelize');
const corsDomain = {
  origin: 'https://todo-amw-ks.onrender.com/'
}

const app = express();
app.use(cors()); // Umożliwienie CORS dla wszystkich tras
app.use(express.json());

(async () => {
  try {
    await db.authenticate();
    await db.sync();

    const count = await Lists.count();
      if (count === 0) {
        // Tworzymy nową listę
        const newList = await Lists.create({ title: "Przykładowy tytuł" });
        console.log("Utworzono listę o numerze:", newList.listNumber , " z tytułem:", newList.title);

        // Dodajemy zadanie powiązane z tą listą
      const task = await Tasks.create({
        description: "Przykładowe zadanie",
        checkbox: false,
        listNumber: newList.listNumber  // klucz obcy wskazujący do listy
      });
      console.log("Utworzono zadanie:", task.toJSON());
        // Wstaw przykładowy wiersz
        //await Lists.create({
        //  title: "Przykładowy tytuł",
        //  description: "Przykładowy opis",
        //  check: true,
        //});
        //console.log("Przykładowy wiersz został dodany.");
      } else {
        //await Lists.destroy({ truncate: true });
        console.log("Tabela zawiera już dane, przykładowy wiersz nie został dodany. USUNIĘTO");
      }
    }
    catch (error) {
        console.error("Wystąpił błąd podczas inicjalizacji bazy danych:", error);
    }
})();

// Endpoint zwracający wszystkie rekordy z tabeli "lists"
app.get('/select-all', async (req, res) => {
  try {
    const results = await Lists.findAll({ include: [{ model: Tasks, as: 'tasks' }]});
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
