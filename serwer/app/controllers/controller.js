// controller.js
const db = require("../models");
const Lists = db.Lists;
const Tasks = db.Tasks;

// Utwórz nową listę
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Pole 'title' nie może być puste!" });
    return;
  }
  const list = { title: req.body.title };
  Lists.create(list)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Błąd przy tworzeniu listy." });
    });
};

// Pobierz wszystkie listy
exports.findAll = (req, res) => {
  Lists.findAll({ include: [{ model: Tasks, as: 'tasks' }] })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Błąd przy pobieraniu list." });
    });
};

// Pobierz pojedynczą listę – konwertujemy id na liczbę, aby dopasować do pola listNumber
exports.findOne = (req, res) => {
  const listNumber = parseInt(req.params.id, 10);
  Lists.findByPk(listNumber, { include: [{ model: Tasks, as: 'tasks' }] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Nie znaleziono listy o listNumber=${listNumber}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Błąd przy pobieraniu listy o listNumber=" + listNumber });
    });
};



exports.deleteList = async (req, res) => {
  const id = parseInt(req.params.listId, 10);

  try {
    const list = await Lists.findByPk(id);
    if (!list) {
      return res.status(404).send({ message: `Nie znaleziono listy o id=${id}.` });
    }
    
    const listNumber = list.listNumber;
    await Tasks.destroy({ where: { listNumber: listNumber } });
    const num = await Lists.destroy({ where: { listNumber: listNumber } });
    
    if (num === 1) {
      res.send({ message: "Lista wraz z powiązanymi taskami została usunięta." });
    } else {
      res.send({ message: `Nie można usunąć listy o id=${listNumber}.` });
    }
  } catch (err) {
    console.error("Błąd przy usuwaniu listy:", err);
    res.status(500).send({ message: "Błąd przy usuwaniu listy o id=" + id });
  }
};







// Tworzenie nowego tasku dla listy – korzystamy z req.params.id jako identyfikatora listy
exports.createTask = async (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({ message: "Pole 'description' jest wymagane!" });
  }
  const newTask = {
    description: req.body.description,
    checkbox: req.body.checkbox || false,
    listNumber: parseInt(req.params.id, 10)
  };
  try {
    const task = await Tasks.create(newTask);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Usuwanie tasku – pobieramy taskId z req.params
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const num = await Tasks.destroy({ where: { id: taskId } });
    if (num === 1)
      res.json({ message: "Task został usunięty." });
    else
      res.status(404).json({ message: `Task o id=${taskId} nie został znaleziony.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
