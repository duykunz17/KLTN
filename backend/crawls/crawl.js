const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const PARAMTERS = require('./../constants/parameterConstant');
require('dotenv').config();

var fs = require('fs');

const dbPlace = require('../models/Place');

const data = JSON.parse(fs.readFileSync('./datas/place.json', 'utf8'));

var insertDocumentIntoMongodb = (places) => {
    console.log('Starting...')
    for (let i = 0; i < places.length; i++) {
        let newPlace = new dbPlace({
            name: places[i].name,
            area: '',
            images: places[i].images,
            description: places[i].description,
            destination: places[i].destination
        })
        
        newPlace.save()
            .then(place => console.log('----> ' + place.name))
            .catch(err => {console.log(err)});
    }
}

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_URL || PARAMTERS.ATLAS_URI_MONGO, () => {
    console.log("MongoDB database connection successfully");
    
    insertDocumentIntoMongodb(data);
});