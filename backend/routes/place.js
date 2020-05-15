const router = require('express').Router();
const dbPlace = require('../models/Place');

var countAllPlaces = (cbCount) => {
    dbPlace.estimatedDocumentCount((err, result) => {
        if (err) return err;
        // console.log(result);
        cbCount(result);
    });
}

router.route('/list-place').get((req, res) => {
    countAllPlaces((cbCount) => {
        // rounds a number up to the next largest whole number
        let totalPages = Math.ceil(cbCount / 6);        // get a amount of product in database

        dbPlace.find().limit(6)
            .then(places => res.json({places, totalPages}))
            .catch(err => res.status(400).json('Error'+ err))
    });
});
router.route('/list-place/page=:page').get((req, res) => {
    let page = req.params.page;
    let skip = (page - 1) * 6;        // bỏ qua số lượng đã tải ban đầu
    dbPlace.find().skip(skip).limit(6)
        .then(places => res.json({places}))
        .catch(err => res.status(400).json('Error'+ err))
})

router.route('/popular-place').get((req, res) => {
    dbPlace.find({rating: {$gte: 3.49}})
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
})
router.route('/:id').get((req, res) => {
    dbPlace.findById(req.params.id)
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/evaluate-place/:id').post((req, res) => {
    let { rating, review, account, voted } = req.body;
    dbPlace.updateOne(
        {_id: req.params.id},
        {$push: { evaluations: {account, voted} },
        $set: { rating: rating, review: review}
    }).then(result => res.json({result}))
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;