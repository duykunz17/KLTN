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

/** Handling Post of users */
const dbPost = require('../models/Post');

router.route('/post').get((req, res) => {
    dbPost.find({status: 'W'})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error' + err))
});
router.route('/post/update/:id').get((req, res) => {
    dbPost.updateOne(
        {_id: req.params.id},
        {$set: {status: 'A'} }
    )
        .then(() => res.json({message: 'Bài đăng đã được duyệt'}))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/post/:id').delete((req, res) => {
    dbPost.updateOne(
        {_id: req.params.id},
        {$set: {status: 'D'} }
    )
        .then(() => res.json({message: 'Bài đăng không được duyệt'}))
        .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;