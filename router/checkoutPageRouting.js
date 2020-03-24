const express = require ('express');
const Product = require('../model/productModel');
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");

const router = express.Router();

router.get("/checkout", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.body.user._id
    }).populate("cart.productId");

    res.render('checkout', {user});
    
});

module.exports = router;