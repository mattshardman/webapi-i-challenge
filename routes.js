const db = require("./data/db");
const dbMethods = require("./databaseMethods");

module.exports = app => {
  app.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
      res.status(400);
      res.json({ error: "Please provide name and bio for the user." });
    }

    dbMethods.insert(req).then(({ status, json }) => {
      res.status(status);
      res.json(json);
    });
  });

  app.get("/api/users", (req, res) => {
    dbMethods.find(req).then(({ status, json }) => {
      res.status(status);
      res.json(json);
    });
  });

  app.get("/api/users/:id", (req, res) => {
    dbMethods.findById(req).then(({ status, json }) => {
      res.status(status);
      res.json(json);
    });
  });

  app.delete("/api/users/:id", (req, res) => {
    dbMethods.deleteOne(req).then(({ status, json }) => {
      res.status(status);
      res.json(json);
    });
  });

  app.put("/api/users/:id", (req, res) => {
    if (!req.body.name || !req.body.bio) {
      res.status(400);
      res.json({ error: "Please provide name and bio for the user." });
    }

    dbMethods.update(req).then(({ status, json }) => {
      res.status(status);
      res.json(json);
    });
  });
};
