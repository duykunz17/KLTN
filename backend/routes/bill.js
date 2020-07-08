const router = require('express').Router();
const moment = require('moment');

// call modle account database
const dbProduct = require('../models/Product');
const dbBill = require('../models/Bill');

var getProductId = (id, callback) => {
    dbProduct.findById(id).exec((err, product) => {
        if (err) return err;

        return callback(product);
    })
}
router.route('/add').post((req, res) => {
    let { bill } = req.body;
    let nowdate = moment(new Date());
    // console.log(moment(bill[0].orderdate).format('YYYY-MM-DD, HH:mm:ss'))

    let tempProducts = products = bill.cart.products, outOfStock = [];

    let messTitle = 'đặt';
    if (bill.isCheckout)
        messTitle = 'mua'

    for (let i = 0; i < products.length; i++) {
        let item = products[i];
        getProductId(item._id, (product) => {
            if (item.quantity <= product.quantity) {
                // console.log("UPDATE");
                // update quantity of product
                dbProduct.findById(item._id).then(el => {
                    el.quantity = product.quantity - item.quantity;

                    // update amountPurchase
                    el.amountPurchase += item.quantity;
                    el.save();
                });
            }
            else {
                outOfStock.push(product);       // push out of stock products
                tempProducts = tempProducts.filter(el => el._id !== item._id);  // keep products sold
            }

            if (i == products.length - 1) {
                if (tempProducts.length == 0)
                    return res.json({ fail: `Những sản phẩm bạn ${messTitle} đã hết!` });
                // add bill
                let newBill = dbBill({
                    account: bill.user,
                    orderdate: nowdate,
                    isCheckout: bill.isCheckout,
                    checkout: bill.checkout,
                    total: bill.cart.total,
                    billDetail: tempProducts,
                    shipAddress: bill.shipAddress
                });
                newBill.save();

                if (outOfStock.length > 0)
                    return res.json({ outOfStock })

                return res.json({ success: `Bạn đã ${messTitle} hàng thành công!` });
            }

        });
    }
});

router.route('/account/:id').get((req, res) => {
    dbBill.find({ "account._id": req.params.id }).sort({ orderdate: -1 })
        .then(bills => res.json(bills))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/update/:id').post((req, res) => {
    let product = req.body;
    dbBill.updateOne(
        { _id: req.params.id, "billDetail._id": product._id },
        { $set: { "billDetail.$.itemEvaluation": product.itemEvaluation } }
    )
        .then(res, () => {
            dbProduct.findById(product._id).then(el => {
                if (el) {
                    if (el.rating && el.review) {
                        if (el.rating === 0)
                            el.rating = product.itemEvaluation;
                        else
                            el.rating = (el.rating + product.itemEvaluation) / 2;
                        el.review += 1;
                    }
                    else {
                        el.rating = product.itemEvaluation;
                        el.review = 1;
                    }
                    el.rating = el.rating.toFixed(1);
                    return el.save().then(res => res.json({ product }));
                }
            });
        })
        .catch(err => res.status(400).json('Error' + err));
});

/** 03/06/2020 handling confirmation or cancel order */
router.route('/:id').delete((req, res) => {
    let products = req.body.billDetail;
    dbBill.findByIdAndDelete(req.params.id)
        .then(() => {
            products.forEach(product => {
                dbProduct.findById(product._id).then(el => {
                    el.quantity += product.quantity;
                    // update amountPurchase
                    el.amountPurchase -= product.quantity;
                    el.save();
                });
            });

            return res.json({result: 'OK'});
        })
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/confirm/:id').post((req, res) => {
    let nowdate = moment(new Date());
    dbBill.updateOne(
        { _id: req.params.id },
        { $set: { orderdate: nowdate, isCheckout: true, checkout: 'thanh toán trực tiếp' } }
    )
        .then(() => res.json({result: 'OK', nowdate}))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;