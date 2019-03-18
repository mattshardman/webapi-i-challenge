const db = require("./data/db");

const insert = async (req, res) =>
  db
    .insert(req.body)
    .then(result => {
      res.status(201);
      res.json(result);
    })
    .catch(() => {
      res.status(501);
      res.json({
        error: "There was an error while saving the user to the database"
      });
    });

const find = (req, res) =>
  db
    .find()
    .then(result => {
      res.status(200);
      res.json(result);
    })
    .catch(() => {
      res.status(500);
      res.json({ error: "The users information could not be retrieved." });
    });

const findById = (req, res) =>
  db
    .findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404);
        res.json({ error: "The user with the specified ID does not exist." });
      }

      res.status(200);
      res.json(result);
    })
    .catch(() => {
      res.status(500);
      res.json({ error: "The users information could not be retrieved." });
    });

const deleteOne = (req, res) =>
  db
    .findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404);
        res.json({ error: "The user with the specified ID does not exist." });
      }
      db.remove(req.params.id).then(() => {
        res.status(200);
        res.json(result);
      });
    })
    .catch(() => {
      res.status(500);
      res.json({ error: "The users information could not be retrieved." });
    });

const update = (req, res) =>
  db
    .update(req.params.id, req.body)
    .then(result => {
      if (!result) {
        res.status(404);
        res.json({ error: "The user with the specified ID does not exist." });
      }

      db.findById(result).then(result => {
        res.status(200);
        res.json(result);
      });
    })
    .catch(() => {
      res.status(500);
      res.json({ error: "The user information could not be modified." });
    });

module.exports = {
  insert,
  find,
  findById,
  deleteOne,
  update
};
