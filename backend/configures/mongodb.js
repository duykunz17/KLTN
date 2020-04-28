const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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
mongoose.connect("mongodb://localhost/testUser", () => console.log("MongoDB database connection successfully"));