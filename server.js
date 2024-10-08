const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file


// Here is where we import modules
// We begin by loading Express
const express = require("express");
const mongoose = require('mongoose');// require package.
// Import the Fruit model
const Fruit = require("./models/fruit.js");



// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const app = express();

app.use(express.urlencoded({ extended: false }));


// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

/// fruits/new
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});




// POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits");
});
// GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
