const router = require('express').Router();

/* GET home page. */
const ProductModle = require('./../modles/Product');

router.route('/').get((req, res) => {
    ProductModle.find()
        .then((products) => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;