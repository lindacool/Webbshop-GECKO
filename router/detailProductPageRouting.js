const express = require ('express');
const Product = require('../model/productModel');

const router = express.Router();

router.get("/products/:id", async (req, res) => {

    const clickedProduct = await Product.findById( {_id: req.params.id} );

    res.render("detailProductPage", { clickedProduct });
    
});

module.exports = router;