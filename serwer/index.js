// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./app/models/index');
const { Lists, Tasks } = db;
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await db.authenticate();
    await db.sync();

    const count = await Lists.count();
    if (count === 0) {
      const newList = await Lists.create({ title: "Przykładowy tytuł" });
      console.log("Utworzono listę o numerze:", newList.listNumber, "z tytułem:", newList.title);
      const task = await Tasks.create({
        description: "Przykładowe zadanie",
        listNumber: newList.listNumber
      });
      console.log("Utworzono zadanie:", task.toJSON());
    } else {
      console.log("Tabela zawiera już dane, przykładowy wiersz nie został dodany.");
    }
  } catch (error) {
    console.error("Błąd podczas inicjalizacji bazy danych:", error);
  }
})();

// Dodatkowy endpoint, który zwraca wszystkie listy z taskami (opcjonalnie)
app.get('/select-all', async (req, res) => {
  try {
    const results = await Lists.findAll({ include: [{ model: Tasks, as: 'tasks' }] });
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
