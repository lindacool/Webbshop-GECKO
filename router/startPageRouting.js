const express = require ('express');
const Product = require('../model/productModel');

const router = express.Router();

router.get('/', async (req, res)=>{
    const newArrivals = await Product.find();
    res.render('startpage', {newArrivals}) //skickar med newarrivals
})

module.exports = router;