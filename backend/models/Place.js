const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: {type: String} ,
    area: {type: String} ,
    images: {type: String},
    description: {type: String},
    rating: {type: Number},
    review: {type: Number},
    evaluations: []
}, {
    timestamps: true,
});

const PlaceData = mongoose.model('Place', placeSchema);

module.exports = PlaceData;