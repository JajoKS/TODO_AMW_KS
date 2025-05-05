const db = require("../models"); // Załóżmy, że models/index.js eksportuje obiekt { sequelize, Sequelize, ... }
const Sequelize = db.Sequelize;
const DataTypes = Sequelize.DataTypes;

// Definicja modelu "Lists".
// Jeśli masz już osobny plik modelu, np. list.model.js, możesz go importować.
const Lists = require('./app/models/list')(sequelize,DataTypes);

// Synchronizacja modelu – utworzy tabelę "lists" jeżeli nie istnieje.
Lists.sync()
  .then(() => console.log("Tabela 'lists' została zapewniona (utworzona, jeśli nie istniała)."))
  .catch(err => console.error("Błąd podczas tworzenia tabeli 'lists':", err));

// --- Funkcje obsługujące CRUD ---

// Utwórz nową Listę
exports.create = (req, res) => {
  // Walidacja – wymagamy pola title
  if (!req.body.title) {
    res.status(400).send({ message: "Pole 'title' nie może być puste!" });
    return;
  }

  // Tworzymy obiekt listy
  const list = {
    title: req.body.title,
    description: req.body.description,
    check: req.body.check !== undefined ? req.body.check : false
  };

  // Zapis do bazy danych
  Lists.create(list)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Wystąpił problem podczas tworzenia listy."
      });
    });
};

// Pobierz wszystkie Listy
exports.findAll = (req, res) => {
  Lists.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Wystąpił problem podczas pobierania list."
      });
    });
};

// Pobierz pojedynczą Listę po identyfikatorze
exports.findOne = (req, res) => {
  const id = req.params.id;
  Lists.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Nie znaleziono listy o id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Wystąpił problem podczas pobierania listy o id=" + id });
    });
};

// Aktualizuj istniejącą Listę
exports.update = (req, res) => {
  const id = req.params.id;
  Lists.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Lista została pomyślnie zaktualizowana." });
      } else {
        res.send({
          message: `Nie można zaktualizować listy o id=${id}. Możliwe, że nie istnieje lub dane zapytania są puste.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Błąd podczas aktualizacji listy o id=" + id });
    });
};

// Usuń listę o określonym id
exports.delete = (req, res) => {
  const id = req.params.id;
  Lists.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Lista została pomyślnie usunięta." });
      } else {
        res.send({ message: `Nie można usunąć listy o id=${id}. Prawdopodobnie nie istnieje.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Błąd podczas usuwania listy o id=" + id });
    });
};

// Usuń wszystkie listy
exports.deleteAll = (req, res) => {
  Lists.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} list(y) zostało/usuniętych pomyślnie!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Wystąpił problem podczas usuwania wszystkich list."
      });
    });
};