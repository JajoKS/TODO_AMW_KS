module.exports = app => {
    const Lists = require("../controllers/controller.js");
    const Task = require("../controllers/controller.js");
    var router = require("express").Router();
    // Create a new List
    router.post("/", Lists.create);
    // Create a new List
    router.post("/:id", Task.create);
    // Retrieve all Lists
    router.get("/", Lists.findAll);
    // Retrieve a single List with id
    router.get("/:id", Lists.findOne);
    // Update a List with id
    router.delete("/:id", Lists.delete);
    // Create a new List
    router.delete("/:id", Task.delete);
    // Delete all 
    //router.delete("/", lists.deleteAll);
    //app.use('/api/listy', router);
};