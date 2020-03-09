const express = require("express");
const Product = require("../model/productModel");

const router = express.Router();

router.get("/products", async (req, res) => {
    const products = await Product.find();
    const heading = "Unisex";
    const otherCategories = ["men", "women"];

    // pagination
    const Item_per_page = 3;
    const totalPages = products.length / Item_per_page;

    // sida nummer
    const page = +req.query.page || 1;

    const productCount = await Product.find().countDocuments();
    console.log(productCount);

    //HÄmtar alla comments
    const productsShow = await Product.find()
        .skip((page - 1) * Item_per_page)
        .limit(Item_per_page);

    res.render("productPage", {
        heading,
        products,
        otherCategories,
        productsShow,
        totalPages
    });
});

router.get("/women", async (req, res) => {
    const products = await Product.find({
        female: true
    });
    const heading = "Women";
    const otherCategories = ["products", "men"];

    res.render("productPage", {
        products,
        heading,
        otherCategories
    }); //skickar med alla kvinno-produkter
});

router.get("/men", async (req, res) => {
    const products = await Product.find({
        male: true
    });
    const heading = "Men";
    const otherCategories = ["products", "women"];

    res.render("productPage", {
        products,
        heading,
        otherCategories
    }); //skickar med alla man-produkter
});

module.exports = router;