const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
    },
    { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
