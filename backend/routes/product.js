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

        dbProduct.find({quantity: {$gt: 0}}).sort({amountPurchase: -1}).limit(6)
            .then(products => res.json({products, totalPages}))
            .catch(err => res.status(400).json('Error'+ err))
    });
});
router.route('/page=:page').get((req, res) => {
    let page = req.params.page;
    let skip = (page - 1) * 6;        // bỏ qua số lượng đã tải ban đầu
    dbProduct.find({quantity: {$gt: 0}}).sort({amountPurchase: -1}).skip(skip).limit(6)
        .then(products => res.json({products}))
        .catch(err => res.status(400).json('Error'+ err))
});
router.route('/search=:info').get((req, res) => {
    let info = req.params.info;
    if (info)
        dbProduct.find({$or: [
                // $options: 'i' không phân biệt hoa thường
                {name: {$regex: info, $options: 'i'}},
                {productType: {$regex: info, $options: 'i'}}
            ]
        })
            .then(products => {
                if (products.length > 0)
                    res.json({products});
                else
                    res.json({message: 'Không tìm thấy thông tin về sản phẩm này'});
            })
            .catch(err => res.status(400).json('Error' + err))
    else
        dbProduct.find({quantity: {$gt: 0}}).sort({amountPurchase: -1}).limit(6)
            .then(products => res.json({products}))
            .catch(err => res.status(400).json('Error'+ err))
});
router.route('/:id').get((req, res) => {
    dbProduct.findById(req.params.id)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;