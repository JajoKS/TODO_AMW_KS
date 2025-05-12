module.exports = app => {
    const Lists = require("../controllers/controller.js");
    var router = require("express").Router();
    // Create a new List
    router.post("/", Lists.create);
    // Retrieve all Lists
    router.get("/", Lists.findAll);
    // Retrieve a single List with id
    router.get("/:id", Lists.findOne);
    // Update a List with id
    router.put("/:id", Lists.update);
    // Delete a List with id
    router.delete("/:id", Lists.delete);
    // Delete all Tutorials
    //router.delete("/", lists.deleteAll);
    //app.use('/api/listy', router);
};