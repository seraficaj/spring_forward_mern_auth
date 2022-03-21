require("./models");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "Welcome to the user app!" });
});

// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users'));

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
