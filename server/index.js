const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const Book = require("./models/Book");
const bookRoutes = require('./routes/bookRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/api', bookRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Models synced");
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log("Database error:", e.message);
  }
};

start();
