const router = require('express').Router();

/* GET home page. */
const ProductModle = require('./../models/Product');

// router.route('/').get((req, res) => {
//     ProductModle.find()
//         .then((products) => res.json(products))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


router.get('/',(req,res)=>{
    res.send('This is a server');
});

module.exports = router;