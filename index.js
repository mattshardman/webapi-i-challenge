// implement your API here
const express = require("express");
const cors = require('cors');
const app = express();

const routes = require('./routes');

app.use(cors());
app.use(express.json());

routes(app);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
