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


router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    // Joi validering
    const {
        error
    } = validateUser(req.body);

    console.log(hashPassword);

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
        to: user.email,
        from: "<no-reply>customerservice@gecko.com",
        subject: "Login succeeded",
        html: "<h1> Welcome " + user.email + "</h1>"
    })


    res.render("login", {
        user
    });

});

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
        res.redirect("/products")
    })
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("jsonwebtoken").redirect("/products")
})

module.exports = router;