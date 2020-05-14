const router = require('express').Router();
const dbProduct = require('../models/Product');
const dbPlace = require('../models/Place');

router.route('/product').get((req, res) => {
    dbProduct.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/product/:id').delete((req,res) => {
    dbProduct.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/place').get((req, res) => {
    dbPlace.find()
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;