const express = require ('express');
const Product = require('../model/productModel');

const router = express.Router();



router.get('/products', async (req, res)=>{

    const products = await Product.find();

    res.render('productPage', {products}) //skickar med alla produkter
})



router.get('/women', async (req, res)=>{
    const products = await Product.find({female: true});

    res.render('productPage', {products}) //skickar med alla kvinno-produkter
})

router.get('/men', async (req, res)=>{
    const products = await Product.find({male: true});
    //en query som hämtar alla som är men;

    res.render('productPage', {products}) //skickar med alla man-produkter
})

module.exports = router;