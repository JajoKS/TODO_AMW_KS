module.exports = app => {
    const lists = require("../controllers/controller.js");
    var router = require("express").Router();
    // Create a new List
    router.post("/", lists.create);
    // Retrieve all Lists
    router.get("/", lists.findAll);
    // Retrieve a single List with id
    router.get("/:id", lists.findOne);
    // Update a List with id
    router.put("/:id", lists.update);
    // Delete a List with id
    router.delete("/:id", lists.delete);
    // Delete all Tutorials
    router.delete("/", lists.deleteAll);
    app.use('/api/listy', router);
};