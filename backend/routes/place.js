const router = require('express').Router();
const moment = require('moment');

const dbPlace = require('../models/Place');

var countAllPlaces = (cbCount) => {
    dbPlace.estimatedDocumentCount((err, result) => {
        if (err) return err;
        // console.log(result);
        cbCount(result);
    });
}

// loading place for place page
router.route('/list-place').get((req, res) => {
    countAllPlaces((cbCount) => {
        // rounds a number up to the next largest whole number
        let totalPages = Math.ceil(cbCount / 6);        // get a amount of product in database

        dbPlace.find().limit(6)
            .then(places => res.json({places, totalPages}))
            .catch(err => res.status(400).json('Error'+ err))
    });
});

// loading place's name for schedule page
router.route('/').get((req, res) => {
        dbPlace.aggregate( [
            { $project : { name : 1 } },
            { $sort: {name: 1} }
        ])
            .then(places => res.json(places) )
            .catch(err => res.status(400).json('Error'+ err))

        // dbPlace.find()
        //     .then(places => res.json(places))
        //     .catch(err => res.status(400).json('Error'+ err))
});

// router.route('/des/:id/:amount').get((req, res) => {
//     let limit = req.params.amount + 6;

//     dbPlace.aggregate(
//         { $match: {_id: req.params.id} },
//         { $project: {destination: 1} }
//     )

//     dbPlace.find({'name': req.params.name}).limit(6)
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
    if (info)
        dbPlace.find({$or: [
                // $options: 'i' không phân biệt hoa thường
                {name: {$regex: info, $options: 'i'}},
                {area: {$regex: info, $options: 'i'}}
            ]
        })
            .then(places => {
                if (places.length > 0)
                    res.json({places, destinations: null});
                else {
                    dbPlace.find({destination:{$elemMatch: {name: {$regex: info, $options: 'i'}}}})
                        .then(destinations => {
                            // console.log(destinations)
                            if (destinations.length > 0)
                                return res.json({places: null, destinations: destinations});    // return list places
                            return res.json({message: 'Không tìm thấy thông tin về địa điểm này'});
                        })
                        .catch(err => res.json('Error' + err))
                }
            })
            .catch(err => res.status(400).json('Error' + err))
    else
        dbPlace.find().limit(6)
            .then(places => res.json({places}))
            .catch(err => res.status(400).json('Error'+ err))
});

router.route('/hashtag=:tag').get((req, res) => {
    let info = req.params.tag;
    if (info)
        dbPlace.find({destination:{$elemMatch: {name: {$regex: info, $options: 'i'}}}}).limit(2)
            .then(places => {
                // console.log(destinations)
                if (places.length > 0)
                    return res.json({places})

                return res.json({message: 'Không tìm thấy thông tin về địa điểm này'});
            })
            .catch(err => res.json('Error' + err))
});


router.route('/popular-place').get((req, res) => {
    dbPlace.find({destination:{$elemMatch: {rating: {$gte: 4}}}}).sort({'destination.$.review': -1}).limit(15)
        .then(places => {
            let temps = places.map(place => {
                let destination = place.destination.filter(des => des.rating >= 4 && des.review >= 1000);
                return destination.sort((a, b) => b.review - a.review);
                // return res.json(place.destination.filter(des => des.rating > 3.49));
            })
            // console.log(temps.length);
            return res.json(temps);
        })
        .catch(err => res.json('Error' + err))
})
router.route('/:id').get((req, res) => {
    dbPlace.findById(req.params.id)
        .then(place => res.json(place))
        .catch(err => res.status(400).json('Error' + err))
})

/** get account by Id */
var dbAccount = require('../models/Account');
var getAccountById = async (account_id) => {
    let account = await dbAccount.findById(account_id)
        .then(result => {
            // console.log(result);
            return result;
        })
        .catch(err => err);
    return account;
}
router.route('/destination/:id').get((req, res) => {
    dbPlace.find({destination:{$elemMatch: {_id: req.params.id}}})
        .then(places => 
            places.map(async place => {
                let destination = await place.destination.filter(des => des._id == req.params.id);
                let evaluations = destination[0].evaluations;
                if (evaluations.length > 0) {
                    evaluations.forEach(async (el, index) => {
                        el.account = await getAccountById(el.account._id);
                        if (index == evaluations.length - 1) {
                            destination[0].evaluations = evaluations;
                            return res.json(destination);
                        }
                    });
                }
                else
                    return res.json(destination);
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
    let { rating, review, account, voted, title, content, images } = req.body;
    let nowdate = moment(new Date());

    rating = rating.toFixed(1);
    // console.log(req.body)
    dbPlace.updateOne(
        {"destination._id":req.params.id},
        {$push: { "destination.$.evaluations": {account, reviewdate: nowdate, voted, title, content, images} },
        $set: { "destination.$.rating": rating,  "destination.$.review": review}
    }).then(result => res.json({result}))
    .catch(err => res.status(400).json('Error' + err));
})


// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://gody.vn/chau-a/viet-nam/tinh-thanh-pho");

//   const places = await page.evaluate(() => {
//     let items = document.querySelectorAll('.checkin');
//     let place = [];
//     items.forEach(item => {
//       place.push({
//         name: item.querySelector('div > a').innerText,
//         url: item.querySelector('div > a').getAttribute('href') + '/diem-den',
//         images: item.querySelector('img').src
//       });
//     });
//     return place;
//   });

//   for (let place of places) {
//     await page.goto(place.url);
//     const destination = await page.evaluate(() => {
//       let listDes = document.querySelectorAll('.list-destination > div > div');
//       let des = [];
//       listDes.forEach(item => {
//         des.push({
//           images: item.querySelector('a > img').src,
//           name: item.querySelector('div > a.fc-nineth').innerText,
//           rating: item.querySelector('span.fc-nineth > span').innerText,
//           review: item.querySelector('span > span.fc-primary').innerText,
//         });
//       });
//       return des;
//     });
//     // console.log(places);
//     // console.log(destination);
    
//     dbPlace.insertMany({
//         "name": place.name,
//         "area": '',
//         "images": place.images,
//         "description": '',
//         "destination": destination
//    })
//   }
//   await browser.close();
// })();

module.exports = router;