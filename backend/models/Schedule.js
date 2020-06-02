const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    account: {type: Object},
    title: {type: String} ,
    startDate: {type: Date} ,
    endDate: {type: Date},
    scheduleList: [{
        date: {type: Date},
        desName: []
    }],
    hashtag: []
}, {
    timestamps: true,
});

const PlaceData = mongoose.model('Schedule', scheduleSchema);

module.exports = PlaceData;