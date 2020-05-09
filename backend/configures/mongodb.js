const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const PARAMTERS = require('./../constants/parameterConstant');
require('dotenv').config();

// call constant paramter
// const PARAMTERS = require('./../constants/parameterConstant');

// const uri = PARAMTERS.ATLAS_URI_MONGO;
// mongoose.connect(uri, {useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true},
//     () => {
//         console.log("MongoDB database connection successfully");
// }).catch(err => console.log(err));


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(PARAMTERS.ATLAS_URI_MONGO, () => console.log("MongoDB database connection successfully"));