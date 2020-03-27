const express = require("express");
const Product = require("../model/productModel");

const router = express.Router();

router.get("/products", async (req, res) => {
    const products = await Product.find();
    const heading = "Unisex";
    const headingDescription = "Check out our Unisex collection, consectetur adipiscing elit. Cras blandit mauris risus, ornare porta neque eleifend sit amet. Vestibulum eleifend.";
    const otherCategories = ["men", "women"];
    const route = "products";

    // pagination
    const itemPerPage = 6;
    const totalPages = Math.ceil(products.length / itemPerPage);

    // sida nummer
    const page = +req.query.page || 1;

    const itemsToShow = itemPerPage * page;

    // const productsShow = await Product.find()
    //     .skip((page - 1) * itemPerPage)
    //     .limit(itemPerPage);

    const productsShow = await Product.find()
        .limit(itemsToShow);

    res.render("productPage", {
        heading,
        products,
        headingDescription,
        otherCategories,
        productsShow,
        totalPages,
        itemPerPage,
        itemsToShow,
        route
    });
});

router.get("/women", async (req, res) => {
    const products = await Product.find({
        female: true
    });
    const heading = "Women";
    const headingDescription = "Women are the best, consectetur adipiscing elit. Cras blandit mauris risus, ornare porta neque eleifend sit amet. Vestibulum eleifend.";
    const otherCategories = ["products", "men"];
    const route = "women";

    // pagination
    const itemPerPage = 3;
    const totalPages = Math.ceil(products.length / itemPerPage);

    // sida nummer
    const page = +req.query.page || 1;

    const itemsToShow = itemPerPage * page;
    
    const productsShow = await Product.find({female: true})
        .limit(itemsToShow);

    res.render("productPage", {
        products,
        heading,
        headingDescription,
        otherCategories,
        productsShow,
        totalPages,
        itemPerPage,
        itemsToShow,
        route
    }); //skickar med alla kvinno-produkter
});

router.get("/men", async (req, res) => {
    const products = await Product.find({
        male: true
    });
    const heading = "Men";
    const headingDescription = "Our mens collection are fabulous, consectetur adipiscing elit. Cras blandit mauris risus, ornare porta neque eleifend sit amet. Vestibulum eleifend.";
    const otherCategories = ["products", "women"];
    const route = "men";

    // pagination
    const itemPerPage = 3;
    const totalPages = Math.ceil(products.length / itemPerPage);
    

    // sida nummer
    const page = +req.query.page || 1;

    const itemsToShow = itemPerPage * page;
    
    const productsShow = await Product.find({male: true})
        .limit(itemsToShow);

    res.render("productPage", {
        products,
        heading,
        headingDescription,
        otherCategories,
        productsShow,
        totalPages,
        itemPerPage,
        itemsToShow,
        route
    });
});

module.exports = router;