const express = require('express');
const Product = require('../model/productModel');

const router = express.Router();



router.get('/products', async (req, res) => {

    const products = await Product.find();
    const heading = "Unisex";
    const headingDescription = "Check out our Unisex collection, consectetur adipiscing elit. Cras blandit mauris risus, ornare porta neque eleifend sit amet. Vestibulum eleifend.";
    const otherCategories = ["men", "women"];
    // pagination
    const Item_per_page = 2;

    // sida nummer 
    const page = +req.query.page || 1;

    let totalComment;

    const commentsCount = await Product.find()
        .countDocuments()
    console.log(commentsCount);

    totalComment = commentsCount;

    //HÄmtar alla comments
    const comments = await Product.find()
        .skip((page - 1) * Item_per_page)
        .limit(Item_per_page)


    res.render('productPage', {
        products,
        heading,
        headingDescription,
        otherCategories,
        comments,
        totalComment,

        hasNextPage: totalComment > Item_per_page * page,

        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        currentPage: page,
        lastPage: Math.ceil(totalComment / Item_per_page)

    }); //skickar med alla produkter


})



router.get('/women', async (req, res) => {
    const products = await Product.find({
        female: true
    });
    const heading = "Women";
    const headingDescription = "Women are the best, consectetur adipiscing elit. Cras blandit mauris risus, ornare porta neque eleifend sit amet. Vestibulum eleifend.";
    const otherCategories = ["products", "men"];

    res.render('productPage', {
        products,
        heading,
        headingDescription,
        otherCategories
    }); //skickar med alla kvinno-produkter
})

router.get('/men', async (req, res) => {
    const products = await Product.find({
        male: true
    });
    const heading = "Men";
    const headingDescription = "Our mens collection are fabulous, consectetur adipiscing elit. Cras blandit mauris risus, ornare porta neque eleifend sit amet. Vestibulum eleifend.";
    const otherCategories = ["products", "women"];

    res.render('productPage', {
        products,
        heading,
        headingDescription,
        otherCategories
    }) //skickar med alla man-produkter
})



module.exports = router;