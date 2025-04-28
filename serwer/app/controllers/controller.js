const db = require("../models");
//const Op = db.Sequelize.Op;

// Create and Save a new list
exports.create = async (req, res) => {
  try {
      // Validate request
      if (!req.body.tytul) {
        res.status(400).send({
          message: "Zawartość nie może być pusta!"
        });
        return;
      }
      // Create a User
      const user = {
        login: req.body.login,
        pass: req.body.pass,
      };
      
      const todo = await User.create(tutorial)
      res.send(todo)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Podczas zapisywania wystąpił błąd."
    });

  }
}
  
// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    try {
      const tytul = req.query.tytul;
      var condition = tytul ? { tytul: { [Op.like]: `%${tytul}%` } } : null;
      const tutoriale = await Tutorial.findAll({
        where: condition
      });
      res.send(tutoriale);
    } catch (error) {
        res.status(500).send({
          message:
          err.message || "Podczas odczytywania wystąpił błąd."
        });
    }
  };
  
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
      const id = req.params.id;
  
      const tutorial = await Tutorial.findByPk(id)
      if (tutorial) {
        res.send(tutorial)
      } else {
        res.status(404).send({
          message: `Nie ma Tutorialu o id=${id}.`
        });
      }
  } catch (err) {
    res.status(500).send({
      message: "Błąd szukania tutorialu o id=" + id
    });
  }
  };
  
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
  
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
    
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Tutoriale ${nums} zostały usunięte!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas usuwania wystąpiły błędy."
      });
    });
};


  // Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { opublikowany: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas znajdowania Tutoriali wystąpiły błędy."
      });
    });
};
                                                  