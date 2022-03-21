const mongoose = require("mongoose");

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/mernAuthLesson";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.once("open", () => {
    console.log(`connected to mongoDB @ ${db.host}:${db.port}`);
});

db.on("error", (err) => {`Error: ${err}`});

module.exports.User = require('./user');