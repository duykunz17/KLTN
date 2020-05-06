const router = require('express').Router();
const dbProduct = require('../models/Product');

router.route('/').get((req, res) =>{
    dbProduct.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error'+ err))
})

router.route('/:id').get((req, res) => {
    dbProduct.findById(req.params.id)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
})

module.exports = router;