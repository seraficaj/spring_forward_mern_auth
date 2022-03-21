const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models");

// POST /users/register -- CREATE a new user
router.post("/register", async (req, res) => {
    try {
        // check if user exists already
        const userCheck = await db.User.findOne({
            email: req.body.email,
        });

        if (userCheck)
            return res
                .status(409)
                .json({ msg: "user already signed up with that email" });
        // hash the password (could validate if we wanted)
        const salt = 9;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // create a user in the db
        const newUser = await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // create a JWT payload to send back to the client
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id,
        };
        // sign the jwt and send it (log them in)
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        });
        res.json({token})
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(503).json({ msg: "oops! server error 503!" });
    }
});
// POST /users/login -- validate login credentials
router.post("/login", async (req, res) => {
    // try to find user in the db that is logging in
    const foundUser = await db.User.findOne({
        email: req.body.email
    });
    // if user is not found -- send back a msg that the user needs to sign up
    if (!foundUser) return res.status(400).json({msg: "incorrect username/password"})
    // check the password from the req.body against the password in the db
    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password);
    // if provided info does not match -- send back an error msg
    if (!matchPasswords) return res.status(400).json({msg: "incorrect username/password"})
    // return create a jwt payload 
    const payload = {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser.id,
    };
    // sign jwt 
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    // send it back
    res.json({token})
});
// GET /users/auth-locked -- example of checking a JWT and not serving data unless the JWT is valid
router.get("/auth-locked", (req, res) => {
    res.send("validate a token");
});
module.exports = router;
