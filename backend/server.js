const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const route = require("./routes/index.route");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use(express.json());

// parse requests of content-type - application
app.use(express.urlencoded({ extended: true }));

const db = require("./models/index");
db.sequelize
  .sync()
  .then(() => {
    console.log("Database is connected successfully.....");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/", route);

// simple route
app.get("/", (req, res) => {
  res.json("Welcome to the server!!");
});

// importing all the routes
require("./routes/index.route");

// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
