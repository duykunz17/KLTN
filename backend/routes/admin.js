const router = require('express').Router();
const dbProduct = require('../models/Product');
const dbPlace = require('../models/Place');

/** Handling Products */
router.route('/product').get((req, res) => {
    dbProduct.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/product/:id').delete((req,res) => {
    dbProduct.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted'))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/product/update/:id').post((req, res) =>{
    // console.log(req.params);
    dbProduct.findById(req.params.id)
        .then(product => {
            product.name = req.body.name;
            product.productType = req.body.productType;
            product.description = req.body.description;
            product.images = req.body.images;
            product.price = req.body.price;
            product.quantity = req.body.quantity;

            product.save()
                .then(() => res.json('Product updated'))
                .catch(err => res.status(400).json('Error' + err))
        })
        .catch(err => res.status(400).json('Error' + err)) 
})

/** Handling Places */

router.route('/place').get((req, res) => {
    dbPlace.find()
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;