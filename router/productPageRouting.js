const express = require ('express');
const Product = require('../model/productModel');

const router = express.Router();



router.get('/products', async (req, res)=>{

    const products = await Product.find();
    const heading = "Unisex";
    const categoryInfo = "Our unisex collection is blablablalbalbalblablbablb bbalblab balbl ba lbalbalbalb lblablab";

    res.render('productPage', {products, heading, categoryInfo}); //skickar med alla produkter
})



router.get('/women', async (req, res)=>{
    const products = await Product.find({female: true});
    const heading = "Women";
    const categoryInfo = "Our Womens collection is blablablalbalbalblablbablb bbalblab balbl ba lbalbalbalb lblablab";

    res.render('productPage', {products, heading, categoryInfo}); //skickar med alla kvinno-produkter
})

router.get('/men', async (req, res)=>{
    const products = await Product.find({male: true});
    const heading = "Men";
    const categoryInfo = "Our Mens collection is blablablalbalbalblablbablb bbalblab balbl ba lbalbalbalb lblablab";

    res.render('productPage', {products, heading, categoryInfo}) //skickar med alla man-produkter
})

module.exports = router;