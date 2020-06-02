const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
    account: {type: Object},
    orderdate: {type: Date},
    checkout: {type: String},
    total: {type: Number},
    billDetail: [],
    shipAddress: {type: String}
}, {
    timestamps: true,
});

const BillData = mongoose.model('Bill', billSchema);

module.exports = BillData;