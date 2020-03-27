const express = require ('express');
const Product = require('../model/productModel');
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");

const router = express.Router();

router.get("/checkout", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.user.user._id
    }).populate("cart.productId");
    
    let totalPrice = 0;

    for (let i = 0; i < user.cart.length; i++) {
        totalPrice += user.cart[i].amount * user.cart[i].productId.price
        
    }
    user.totalCartPrice = totalPrice;
    await user.save()
    res.render('checkout', {user});
    
    
});

module.exports = router;