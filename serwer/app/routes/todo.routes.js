// todo.routes.js
module.exports = app => {
  const Lists = require("../controllers/controller.js");
  var router = require("express").Router();

  // Endpoints dla list:
  router.post("/", Lists.create);
  router.get("/", Lists.findAll);
  router.get("/:id", Lists.findOne);
  router.delete("/:id", Lists.delete);

  // Endpoints dla tasków:
  router.post("/:id/tasks", Lists.createTask);       // Dodanie tasku do listy o id :id
  router.delete("/:id/tasks/:taskId", Lists.deleteTask); // Usunięcie zadania o id :taskId

  app.use('/api/listy', router);
};
