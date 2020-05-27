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

router.route('/').get((req, res) => {
        dbPlace.find()
            .then(places => res.json(places))
            .catch(err => res.status(400).json('Error'+ err))
});

// router.route('/destination/:name').get((req, res) => {
//     dbPlace.find({'name': req.params.name})
//         .then(places => 
//             places.map(place => {
//                 return res.json(place.destination.map(des => des));
//             })
//         )
//         .catch(err => res.status(400).json('Error'+ err))
// });

router.route('/list-place/page=:page').get((req, res) => {
    let page = req.params.page;
    let skip = (page - 1) * 6;        // bỏ qua số lượng đã tải ban đầu
    dbPlace.find().skip(skip).limit(6)
        .then(places => res.json({places}))
        .catch(err => res.status(400).json('Error'+ err))
})

router.route('/search=:info').get((req, res) => {
    let info = req.params.info;
    console.log(info)
    if (info)
        dbPlace.find({$or: [
                // $options: 'i' không phân biệt hoa thường
                {name: {$regex: info, $options: 'i'}},
                {area: {$regex: info, $options: 'i'}}
            ]
        })
            .then(places => {
                if (places.length > 0)
                    res.json({places});
                else
                    res.json({message: 'Không tìm thấy thông tin về sản phẩm này'});
            })
            .catch(err => res.status(400).json('Error' + err))
    else
        dbPlace.find().limit(6)
            .then(places => res.json({places}))
            .catch(err => res.status(400).json('Error'+ err))
});

router.route('/popular-place').get((req, res) => {
    dbPlace.find({destination:{$elemMatch: {rating: {$gt: 3.49}}}})
        .then(places => {
            let temps = places.map(place => {
                let destination = place.destination.filter(des => des.rating > 3.49);
                return destination;
                // return res.json(place.destination.filter(des => des.rating > 3.49));
            })
            // console.log(temps[0]);
            return res.json(temps[0]);
        })
        .catch(err => res.json('Error' + err))
})
router.route('/:id').get((req, res) => {
    dbPlace.findById(req.params.id)
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/destination/:id').get((req, res) => {
    dbPlace.find({destination:{$elemMatch: {_id: req.params.id}}})
        .then(places => 
            places.map(place => {
                return res.json(place.destination.filter(des => des._id == req.params.id));
            })
        )
        .catch(err => res.status(400).json('Error' + err))
})

// router.route('/evaluate-place/:id').post((req, res) => {
//     let { rating, review, account, voted } = req.body;
//     dbPlace.updateOne(
//         {_id: req.params.id},
//         {$push: { evaluations: {account, voted} },
//         $set: { rating: rating, review: review}
//     }).then(result => res.json({result}))
//     .catch(err => res.status(400).json('Error' + err));
// })

router.route('/evaluate-destination/:id').post((req, res) => {
    let { rating, review, account, voted } = req.body;
    // console.log(req.body)
    dbPlace.updateOne(
        {"destination._id":req.params.id},
        {$push: { "destination.$.evaluations": {account, voted} },
        $set: { "destination.$.rating": rating,  "destination.$.review": review}
    }).then(result => res.json({result}))
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;