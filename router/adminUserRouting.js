const express = require('express');
const Product = require('../model/productModel');
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");


const router = express.Router();
//för att kunna lägga till att anvöndare är Admin

router.get('/adminUser', verifyToken, async (req, res) => {
    const user = await User.find();
    res.render('adminUser.ejs', {
        user
    })
})

// router.post('/adminUser', verifyToken, async (req, res) => {


//     const user = new User({
//         firstName: req.body.firstName,
//         surName: req.body.surName,
//         email: req.body.email,
//         password: req.body.password,
//         admin: req.body.admin = Boolean(req.body.admin)
//         // resetToken: req.body.resetToken,
//         // expirationToken: req.body.expirationToken,

//     })
//     await user.save((error, succes) => {
//         if (error) {
//             res.send(error.message)
//         }
//     })

//     res.redirect('adminUser')
// });

// Edit product
router.post("/adminUser/:id", verifyToken, async (req, res) => {

    await user.updateOne({
        _id: req.params.id
    }, {
        $set: {
            // firstName: req.body.firstName,
            // surName: req.body.surName,
            // email: req.body.email,
            // password: req.body.password,
            admin: req.body.admin = Boolean(req.body.admin)
        }
    });
    if (user.isAdmin === true) {
        res.redirect("/adminUser");
    } else {
        res.send("not ok")
    }
});
router.get("/secret", verifyToken, (req, res) => {
    console.log("is comming from verify", req.user)
    if (req.user.user.isAdmin === true) return res.send("You are admin")
    return res.send("You are not authorised")
})

module.exports = router;