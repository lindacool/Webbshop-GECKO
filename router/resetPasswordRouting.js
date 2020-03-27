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

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.mail
    }
}))


// återställer lösenordet. 
router.get("/reset", (req, res) => {
    res.render("reset")
})

router.post("/reset", async (req, res) => {
    const existUser = await User.findOne({
        email: req.body.resetMail
    })
    if (!existUser) return res.redirect("/login");

    crypto.randomBytes(32, async (err, token) => {
        if (err) return res.redirect("/login")
        const resetToken = token.toString("hex");
        existUser.resetToken = resetToken;
        existUser.expirationToken = Date.now() + 1000000;
        await existUser.save();
    })
    res.send(existUser);

})
module.exports = router;