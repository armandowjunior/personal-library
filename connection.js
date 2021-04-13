const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useCreateIndex: true, // to remove the deprecating warning
  useUnifiedTopology: true,
}); // connect to the database

const db = mongoose.connection; // Connection constructor

db.on("error", console.error.bind(console, "connection error:")); // gives an error if the connection was unsucessfull;

db.once("open", () => {
  // Otherwise, informs that the connection to the db was successful
  console.log("Connection Successful!");
});

module.exports = db;
