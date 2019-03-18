const db = require("./data/db");
const dbMethods = require('./databaseMethods');

module.exports = app => {
    app.post("/api/users", (req, res) => {
        if (!req.body.name || !req.body.bio) {
          res.status(400);
          res.json({ error: "Please provide name and bio for the user." });
        }
      
        dbMethods.insert(req,res);
      });
      
      app.get("/api/users", (req, res) => {
        dbMethods.find(req,res)
      });
      
      app.get("/api/users/:id", (req, res) => {
        dbMethods.findById(req,res);
      });
      
      app.delete("/api/users/:id", (req, res) => {
        dbMethods.deleteOne(req,res);
      });
      
      app.put("/api/users/:id", (req, res) => {
        const { params, body } = req;
        if (!body.name || !body.bio) {
          res.status(400);
          res.json({ error: "Please provide name and bio for the user." });
        }
      
        dbMethods.update(req,res);
      });
}