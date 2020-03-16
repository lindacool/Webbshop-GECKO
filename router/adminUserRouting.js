const express = require('express');
const Product = require('../model/productModel');
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");


const router = express.Router();
//för att kunna lägga till att anvöndare är Admin


router.get('/adminUser', verifyToken, async (req, res) => {

    // const user = await req.user
    const users = await User.find();

    if (req.user.user.isAdmin === true) {
        res.render('adminUser.ejs', {users}) 
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


module.exports = router;