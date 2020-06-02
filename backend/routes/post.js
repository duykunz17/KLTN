const router = require('express').Router();
const moment = require('moment');

const dbPost = require('../models/Post');

router.route('/').get((req, res) => {
    dbPost.find({ "status": 'A' }).sort({ postDate: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/post-recent').get((req, res) => {
    dbPost.find({ "status": 'A' }).sort({ postDate: -1 }).limit(6)
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/post-popular').get((req, res) => {
    let date = moment(new Date());
    let day = date.get('date'), month = date.get('month') + 1, year = date.get('year');

    let checkDay = day - 2, checkMonth = month, checkYear = year;
    if (day <= 2) {
        checkMonth = month - 1;
        if (checkMonth == 1) {
            checkYear = year - 1;
            checkMonth = 12;
        }
        checkDay = getDayOfMonth(day, checkMonth);
    }

    dbPost.find({ "status": 'A', postDate: { $gte: new Date(`${checkYear}-${checkMonth}-${checkDay}`), $lt: new Date(`${year}-${month}-${day + 1}`) } }).sort({ sumLike: -1 }).limit(3)
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/account/:id').get((req, res) => {
    dbPost.find({ "account._id": req.params.id }).sort({ postDate: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    let account = req.body.account;
    let content = req.body.content;
    let postDate = moment(new Date());
    let images = req.body.images;
    let status = 'W';         // W: waiting (chờ duyệt), D: deleted (hủy bài đăng), A: accepted (chấp nhận)

    var newPost = new dbPost({ account, content, postDate, images, status, sumLike: 0, interactions: [], comments: [] });
    newPost.save()
        .then(() => res.json({ result: newPost }))
        .catch(err => res.status(400).json('Error' + err))
});
router.route('/:id').delete((req, res) => {
    dbPost.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Bài đăng đã được xóa' }))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/update/:id').post((req, res) => {
    // console.log(req.params);
    dbPost.findById(req.params.id)
        .then(post => {
            // xem lại nữa tăng sumLike và update comments []
            post.like = req.body.like

            post.save()
                .then(() => res.json({ result: post }))
                .catch(err => res.status(400).json('Error' + err))
        })
        .catch(err => res.status(400).json('Error' + err))
});

/** handling 22/05/2020 */
router.route('/:id').get((req, res) => {
    dbPost.findById(req.params.id)
        .then(post => res.json({ post }))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/newlike/:id').post((req, res) => {
    let { interactions, sumLike } = req.body;
    dbPost.updateOne(
        { _id: req.params.id },
        {
            $push: { interactions: interactions },
            $set: { sumLike: sumLike }
        }
    ).then(result => res.json({ result }))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/dislike/:id').post((req, res) => {
    let { interactions, sumLike } = req.body;
    dbPost.updateOne(
        { _id: req.params.id, "interactions._id": interactions.getIdInteract },
        {
            $set: { sumLike: sumLike, "interactions.$.like": false }
        }
    ).then(result => res.json({ result }))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/likeagain/:id').post((req, res) => {
    let { interactions, sumLike } = req.body;
    dbPost.updateOne(
        { _id: req.params.id, "interactions._id": interactions.getIdInteract },
        {
            $set: { sumLike: sumLike, "interactions.$.like": true }
        }
    ).then(result => res.json({ result }))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/comments/:id').post((req, res) => {
    let comment = req.body;
    comment.commentDate = moment(new Date());
    dbPost.updateOne(
        { _id: req.params.id },
        { $push: { comments: comment } }
    ).then(result => res.json({ result }))
        .catch(err => res.status(400).json('Error' + err));
});

/** handling 31/05/2020 -> get the top 5 posts that have a lot of hearts in last 2 days */
// get the end of the month
function getDayOfMonth(day, month) {
    switch (month) {
        case 2:
            if (day == 1)
                return 27;
            return 28;
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            if (day == 1)
                return 29;
            return 30;
        case 4: case 6: case 9: case 11:
            if (day == 1)
                return 28;
            return 29;
        default: return false;
    }
}

module.exports = router;