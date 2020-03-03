const {User, validateUser} = require("../model/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.get("/register", (req, res) => {

    res.render("register");

});

router.post("/register", async (req, res) => {

    // Joi validering
    const { error } = validateUser(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    };

    // Kolla om användare redan finns
    let user = await User.findOne( {email: req.body.email} );

    if (user) {
        return res.status(400).send("User already exists");
    };

    // Skapa nya användare
    user = new User( {
        firstName: req.body.firstName,
        surname: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();

    res.render("login", {user});

});

module.exports = router;