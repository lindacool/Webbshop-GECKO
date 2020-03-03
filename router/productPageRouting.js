const express = require ('express');
const Product = require('../model/productModel');

const router = express.Router();



router.get('/products', async (req, res)=>{

    const products = await Product.find();
    const heading = "Unisex";
    const otherCategories = ["men", "women"];

    res.render('productPage', {products, heading, otherCategories}); //skickar med alla produkter
})



router.get('/women', async (req, res)=>{
    const products = await Product.find({female: true});
    const heading = "Women";
    const otherCategories = ["products", "men"];

    res.render('productPage', {products, heading, otherCategories}); //skickar med alla kvinno-produkter
})

router.get('/men', async (req, res)=>{
    const products = await Product.find({male: true});
    const heading = "Men";
    const otherCategories = ["products", "women"];

    res.render('productPage', {products, heading, otherCategories}) //skickar med alla man-produkter
})

module.exports = router;