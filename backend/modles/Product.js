const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    code: {type: Number},
    name: {type: String},
    price: {type: Number},
    status: {type: Boolean}
}, {
    timestamps: true,
});

const ProductData = mongoose.model('Products', productSchema);

module.exports = ProductData;