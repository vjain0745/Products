var mongoose = require('mongoose');
var product = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: String,
        required: true,
        trim: true
    },

    images: [{
        type: String,
        required: true,
        trim: true
    }],

    variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "variants"
    }]
});



var products = mongoose.model('products', product);
module.exports = products;
