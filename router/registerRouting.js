const {
    User,
    validateUser
} = require("../model/userModel");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const verifyToken = require("./verifyToken");
const config = require("../config/config");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");


const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.mail
    }
}))

// Sign up/register
router.route("/register")
    .get((req, res) => {
        res.render("register.ejs")
    })

    .post(async (req, res) => {

        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        // Joi validering
        const {
            error
        } = validateUser(req.body);


        if (error) {
            return res.status(400).send(error.details[0].message)
        };

        // Kolla om användare redan finns
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(400).send("User already exists");
        };

        // Skapa nya användare
        user = new User({
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: req.body.email,
            password: hashPassword
        });
        await user.save();


        transport.sendMail({
            to: "ottenby123@gmail.com",
            from: "<no-reply>customerservice@gecko.com",
            subject: "Login succeeded",
            html: "<h1> Welcome " + user.email + "</h1>"
        })


        res.render("login", {
            user
        });

    });

module.exports = router;