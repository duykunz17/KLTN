const router = require('express').Router();
const dbPlace = require('../models/Place');

router.route('/list-place').get((req, res) =>{
    dbPlace.find()
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error'+ err))
})
router.route('/popular-place').get((req, res) => {
    dbPlace.find({rating: {$gte: 4}})
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
})
router.route('/:id').get((req, res) => {
    dbPlace.findById(req.params.id)
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error' + err))
})

module.exports = router;