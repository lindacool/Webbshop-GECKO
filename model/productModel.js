const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    imgUrl: {
        type: String,
        required: true,
        minLength: 2,
        
    },
    imgUrlTwo: {
        type: String,
        required: true,
        minLength: 2,
        
    },
    imgUrlThree: {
        type: String,
        required: true,
        minLength: 2,
        
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 5
    },
    newArrival: {
        type: Boolean
    },
    topSeller: {
        type: Boolean
    },
    male: {
        type: Boolean
    },
    female: {
        type: Boolean
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;