const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
    description: {type: String},
    images: {type: String},
    price: {type: Number},
    status: {type: Boolean}
}, {
    timestamps: true,
});

const ProductData = mongoose.model('Product', productSchema);

module.exports = ProductData;