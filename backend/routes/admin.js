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
router.route('/product/update/:id').post((req, res) => {
    let product = req.body;
    console.log(product);
    res.json({messSuccess: 'Cập nhật thông tin thành công'})
    // dbProduct.findById(req.params.id)
    //     .then(acc => {
    //         acc.avatar = user.avatar;
    //         acc.person.name = user.person.name;
    //         acc.person.gender = user.person.gender;
    //         acc.person.phone = user.person.phone;
    //         acc.person.address = user.person.address;
    //         acc.person.email = user.person.email;

    //         acc.save()
    //             .then(() => res.json({messSuccess: 'Cập nhật thông tin thành công'}))
    //             .catch(err => res.status(400).json('Error' + err));
    //     })
})


/** Handling Places */

router.route('/place').get((req, res) => {
    dbPlace.find()
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;