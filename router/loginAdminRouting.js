const {Admin, validateAdmin} = require("../model/adminModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const verifyToken = require("./verifyToken")



router.get("/loginadmin", async (req, res) => {

    const errorMessage = "";
    res.render("loginAdmin", { errorMessage });

});

router.post("/registeradmin", async (req, res) => {

    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    // Joi validering
    const { error } = validateAdmin(req.body);

    console.log(hashPassword);

    if (error) {
        return res.status(400).send(error.details[0].message)
    };

    // Kolla om användare redan finns
    let admin = await Admin.findOne( {userName: req.body.userName} );

    if (admin) {
        return res.status(400).send("User already exists");
    };

    // Skapa nya användare
    admin = new Admin( {
        userName: req.body.userName,
        password: hashPassword
    });
    await admin.save();

    res.redirect("/admin")
})

router.post("/loginadmin", async (req, res) => {

    const admin = await Admin.findOne({ userName: req.body.userName });
    if (!admin) return res.render("loginAdmin", {errorMessage: "Invalid credentials"})

    const validAdmin = await bcrypt.compare(req.body.password, admin.password)

    if (!validAdmin) return res.render("loginAdmin", {errorMessage: "Invalid credentials"})

    jwt.sign({ admin }, "secretkey", (err, token) => {
        if (err) res.redirect("/loginadmin")

        if (token) {

            const cookie = req.cookies.jsonwebtoken;
            if (!cookie) {

                res.cookie('jsonwebtoken', token, { maxAge: 3600000, httpOnly: true });
            }
        }
        res.redirect("/admin")
    })

});

module.exports = router;