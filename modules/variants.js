var mongoose = require('mongoose');
var variant = new mongoose.Schema({

    color: [{
        type: String,
        required: true,
        trim: true
    }],

    size: [{
        type: String,
        required: true,
        trim: true
    }],

    delivery:{
        type: Object,
        required: true,
        trim: true
    },

});



var variants = mongoose.model('variants', variant);
module.exports = variants;
