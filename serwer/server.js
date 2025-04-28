const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;

var corsOptions = {
    origin: "https://todo-amw-ks.onrender.com"
};

/*
app.use(cors(corsOptions))
app.use(express.json())
// parse requests - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.authenticate();
db.sync();
*/

app.get('/', (req,res) => {
    res.json({ message: "To ja SERWER!!!." })
});
require("./app/routes/routes.js")(app);

app.listen(port,() => {
    console.log(`Serwer działa na ${port}`);
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "To ja SERWER!!!." });
});
