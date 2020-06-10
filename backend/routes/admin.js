const router = require('express').Router();
const dbProduct = require('../models/Product');
const dbPlace = require('../models/Place');

/** Handling Products */
router.route('/product').get((req, res) => {
    dbProduct.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/product/:id').delete((req, res) => {
    dbProduct.findByIdAndDelete(req.params.id)
        .then(() => res.json({messSuccess: 'Xóa sản phẩm thành công'}))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/product/add').post((req, res) => {
    let {name, productType, description, images, price, quantity} = req.body;
    let status = false, amountPurchase = 0, rating = 0, review = 0;

    if (quantity > 0)
        status = true;

    let newProduct = new dbProduct({name, productType, description, images, price, quantity, status, amountPurchase, rating, review});

    newProduct.save()
        .then(product => {
            // console.log(product);
            res.json({result: product});
        })
        .catch(err => {
            res.status(400).json('Error'+ err)
        });
});

router.route('/product/update/:id').post((req, res) => {
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
                .then(() => res.json({messSuccess: 'Cập nhật sản phẩm thành công'}))
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
    dbPost.find({ status: 'W' })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error' + err))
});
router.route('/post/update/:id').get((req, res) => {
    dbPost.updateOne(
        { _id: req.params.id },
        { $set: { status: 'A' } }
    )
        .then(() => res.json({ message: 'Bài đăng đã được duyệt' }))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/post/:id').delete((req, res) => {
    dbPost.updateOne(
        { _id: req.params.id },
        { $set: { status: 'D' } }
    )
        .then(() => res.json({ message: 'Bài đăng không được duyệt' }))
        .catch(err => res.status(400).json('Error' + err));
});


/** Handling Statistical Product */
const dbBill = require('../models/Bill');
const moment = require('moment');

/**
 * Node: use moment
 *  day   = moment('2020-05-28T14:59:31.485Z').get('date');
 *  month = moment('2020-05-28T14:59:31.485Z').get('month') + 1;
 *  year  = moment('2020-05-28T14:59:31.485Z').get('year');
 */

// Is this check the end of the month?
function checkDayOfMonth(day, month) {
    switch (month) {
        case 2:
            if (day == 29)
                return true;
            return false;
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            if (day == 31)
                return true;
            return false;
        case 4: case 6: case 9: case 11:
            if (day == 30)
                return true;
            return false;
        default: return false;
    }
}

router.route('/statistical/product/sell-day').post((req, res) => {
    let date = moment(req.body.date);
    let day = date.get('date'), month = date.get('month') + 1, year = date.get('year');

    let checkMonth = month, checkDay = day + 1;
    if (checkDayOfMonth(day, month)) {
        checkMonth += 1;
        checkDay = 1;
    }

    dbBill.aggregate([
        { $match: { isCheckout: true, orderdate: { $gte: new Date(`${year}-${month}-${day}`), $lt: new Date(`${year}-${checkMonth}-${checkDay}`) } } },
        { '$unwind': '$billDetail' },
        { '$group': { '_id': "$billDetail.name", sumPurchase: { $sum: "$billDetail.quantity" } } },
        { $sort: { sumPurchase: -1 } },
        { $limit: 10 }
    ],
        function (err, results) {
            if (err)
                return err;

            // console.log(results);
            return res.json(results);
            // callback(results);
        }
    );
});
router.route('/statistical/product/sell-month').post((req, res) => {
    let date = moment(req.body.date);
    let month = date.get('month') + 1, year = date.get('year');

    let checkMonth = month + 1, checkYear = year;
    if (month == 12) {
        checkYear += 1;
        checkMonth = 1;
    }

    dbBill.aggregate([
        { $match: { isCheckout: true, orderdate: { $gte: new Date(`${year}-${month}-${1}`), $lt: new Date(`${checkYear}-${checkMonth}-${1}`) } } },
        { '$unwind': '$billDetail' },
        { '$group': { '_id': "$billDetail.name", sumPurchase: { $sum: "$billDetail.quantity" } } },
        { $sort: { sumPurchase: -1 } },
        { $limit: 15 }
    ],
        function (err, results) {
            if (err)
                return err;

            // console.log(results);
            return res.json(results);
            // callback(results);
        }
    );
});
router.route('/statistical/product/sell-year').post((req, res) => {
    let date = moment(req.body.date);
    let year = date.get('year');

    dbBill.aggregate([
        { $match: { isCheckout: true, orderdate: { $gte: new Date(`${year}-${1}-${1}`), $lt: new Date(`${year + 1}-${1}-${1}`) } } },
        { '$unwind': '$billDetail' },
        { '$group': { '_id': "$billDetail.name", sumPurchase: { $sum: "$billDetail.quantity" } } },
        { $sort: { sumPurchase: -1 } },
        { $limit: 15 }
    ],
        function (err, results) {
            if (err)
                return err;

            // console.log(results)
            return res.json(results);
            // callback(results);
        }
    );
});

/** Handling Statistical renvenue */
router.route('/statistical/renvenue-sale').post((req, res) => {
    let date = moment(req.body.date);
    let year = date.get('year');

    dbBill.aggregate([
        { $match: { isCheckout: true, orderdate: { $gte: new Date(`${year}-${1}-${1}`), $lt: new Date(`${year + 1}-${1}-${1}`) } } },
        // { '$unwind': '$billDetail' },
        { '$group': { '_id': { $month: "$orderdate" }, total: { $sum: "$total" } } },
        // { $sort: { sumPurchase: -1 } },
        // { $limit: 15 }
    ],
        function (err, results) {
            if (err)
                return err;

            // console.log(results);
            return res.json(results);
            // callback(results);
        }
    );
})

module.exports = router;