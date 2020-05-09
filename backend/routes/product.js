const router = require('express').Router();
const dbProduct = require('../models/Product');

var countAllProducts = (cbCount) => {
    dbProduct.estimatedDocumentCount((err, result) => {
        if (err) return err;
        // console.log(result);
        cbCount(result);
    });
}

router.route('/').get((req, res) => {
    countAllProducts((cbCount) => {
        // rounds a number up to the next largest whole number
        let totalPages = Math.ceil(cbCount / 6);        // get a amount of product in database

        dbProduct.find().limit(6)
            .then(products => res.json({products, totalPages}))
            .catch(err => res.status(400).json('Error'+ err))
    });
});
router.route('/page=:page').get((req, res) => {
    let page = req.params.page;
    let skip = (page - 1) * 6;        // bỏ qua số lượng đã tải ban đầu
    dbProduct.find().skip(skip).limit(6)
        .then(products => res.json({products}))
        .catch(err => res.status(400).json('Error'+ err))
});

router.route('/:id').get((req, res) => {
    dbProduct.findById(req.params.id)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
})

module.exports = router;