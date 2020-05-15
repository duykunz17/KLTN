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

    for (let i = 0; i < products.length; i++) {
        let item = products[i];
        getProductId(item._id, (product) => {
            if (item.quantity <= product.quantity) {
                // console.log("UPDATE");
                // update quantity of product
                dbProduct.findById(item._id).then(el => {
                    el.quantity = product.quantity - item.quantity;
                    el.save();
                });
            }
            else {
                outOfStock.push(product);       // push out of stock products
                tempProducts = tempProducts.filter(el => el._id !== item._id);  // keep products sold
            }
            
            if (i == products.length - 1) {
                if (tempProducts.length == 0)
                    return res.json({fail: 'Những sản phẩm bạn đặt đã hết!'});
                // add bill
                let newBill = dbBill({
                    account: bill.user,
                    orderdate: nowdate,
                    checkout: bill.checkout,
                    total: bill.cart.total,
                    billDetail: tempProducts
                });
                newBill.save();

                if (outOfStock.length > 0)
                    return res.json({outOfStock})

                return res.json({success: 'Bạn đã thanh toán thành công!'});
            }
                
        });
    }
});


module.exports = router;