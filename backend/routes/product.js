const router = require('express').Router();
const dbProduct = require('../models/Product');
const { db } = require('../models/Product');

var countAllProducts = (cbCount) => {
    dbProduct.aggregate([
        { $match: {quantity: {$gt: 0}} },
        { $count: "total" }
    ])
    .then (result => cbCount(result[0].total))
}

router.route('/').get((req, res) => {
    countAllProducts((cbCount) => {
        // rounds a number up to the next largest whole number
        let totalPages = Math.ceil(cbCount / 6);        // get a amount of product in database

        dbProduct.aggregate([
            { $match: {quantity: {$gt: 0}} },
            { $sort : { amountPurchase : -1, rating: -1 } },
            { $limit: 6}
        ])
            .then(products => res.json({products, totalPages}))
            .catch(err => res.status(400).json('Error'+ err))            
    });
});
router.route('/category').get((req, res) => {
    dbProduct.distinct("productType")
        .then(types => res.json({productTypes: types}))
        .catch(err => res.status(400).json('Error'+ err))
});

router.route('/page=:page').get((req, res) => {
    let page = req.params.page;
    let skip = (page - 1) * 6;        // bỏ qua số lượng đã tải ban đầu
    dbProduct.find({quantity: {$gt: 0}}).sort({amountPurchase : -1, rating: -1}).skip(skip).limit(6)
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

/** Handling category 26/06/2020 */

router.route('/category/:type').get((req, res) => {
    let productType = req.params.type;
    dbProduct.find({productType})
        .then(products => res.json({products}))
        .catch(err => res.status(400).json('Error'+ err))
});

// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.zemzemshop.com/san_pham");

//   const products = await page.evaluate(() => {
//     let items = document.querySelectorAll('.part');
//     let product = [];
//     items.forEach(item => {
//         if(item.querySelector('div > .current_price').innerText !== 'Liên hệ'){
//             product.push({
//                 name: item.querySelector('div > .intro1 > a').innerText,
//                 images: item.querySelector('div > a > img').src,
//                 price: item.querySelector('div > .current_price').innerText
//               });
//         }
//     });
//     return product;
//   });
//   products.map(item => {
//         dbProduct.insertMany({
//             "name": item.name,
//             "productType": '',
//             "description": '',
//             "images": item.images,
//             "price": parseFloat(item.price),
//             "status": true,
//             "amountPurchase": 0,
//             "quantity": 50,
//             "rating": 5,
//             "review": 1
//           })
//   })
//    //console.log(products);
    
//   await browser.close();
// })();

module.exports = router;