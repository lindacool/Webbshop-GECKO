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



router.get("/login", (req, res) => {

    res.render("login");

});

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.mail
    }
}))

router.post("/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.loginEmail
    });

    if (!user) return res.redirect("/login")

    const validUser = await bcrypt.compare(req.body.loginPassword, user.password)

    if (!validUser) return res.redirect("/login")

    jwt.sign({
        user
    }, "secretkey", (err, token) => {
        if (err) res.redirect("/login")

        if (token) {

            const cookie = req.cookies.jsonwebtoken;
            if (!cookie) {

                res.cookie('jsonwebtoken', token, {
                    maxAge: 3600000,
                    httpOnly: true
                });
            }
        }
        res.redirect("/")
    })
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("jsonwebtoken").redirect("/products")
})

module.exports = router;