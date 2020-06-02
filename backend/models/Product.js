const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
    productType: {type: String},
    description: {type: String},
    images: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    status: {type: Boolean},
    amountPurchase: {type: Number},
    rating: {type: Number},
    review: {type: Number}
}, {
    timestamps: true,
});

const ProductData = mongoose.model('Product', productSchema);

module.exports = ProductData;