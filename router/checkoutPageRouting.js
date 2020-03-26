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
    
    let total = 0;

    for (let i = 0; i < user.cart.length; i++) {
        total += user.cart[i].amount * user.cart[i].productId.price
        
    }
    user.totalCartPrice = total;
    await user.save()
    res.render('checkout', {user});
    
    
});

module.exports = router;