const express = require('express');
const Product = require('../model/productModel');
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");


const router = express.Router();
//för att kunna lägga till att anvöndare är Admin


router.get('/adminUser', verifyToken, async (req, res) => {
    //const user = await User.findOne();
    const user = req.user
console.log(req.user.user.isAdmin)
    if (req.user.user.isAdmin === true) {
        res.render('adminUser.ejs', user) 
    } else {
        res.send("not ok")
    }


})


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
            isAdmin: req.body.isAdmin = Boolean(req.body.isAdmin)
        }
    });

});
router.get("/secret", verifyToken, (req, res) => {
    console.log("is comming from verify", req.user)
    if (req.user.user.isAdmin === true) return res.send("You are admin")
    return res.send("You are not authorised")
})

module.exports = router;