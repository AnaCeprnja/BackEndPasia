// Imports
require("dotenv").config()
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");
const chalk = require("chalk");
require("./config/passport")(passport);

// App Set up
const app = express();
app.set("title", "Paisa API Server");

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());

// API Routes
app.get("/api/", (req, res) => {
  res.json({ name: "Paisa API Server", author: "Ana Ceprnja, Nathan Holm, Swati Makhija", message: "" });
});

app.use("/api/users", routes.user);
app.use("/api/messages", routes.message);
app.use("/api/transaction-accounts", routes.transactionAccount);
app.use("/api/currencies", routes.currency);
app.use("/api/transactions", routes.transaction);
app.use("/api/stocks", routes.stock);
app.use("/api/accounts", routes.accountUpdater);


// Server
const server = app.listen(PORT, () => console.log(chalk`\n{blue ${app.get("title")}} | Running on port ${PORT}`));

module.exports = server;
