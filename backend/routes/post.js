const router = require('express').Router();
const moment = require('moment');

const dbPost = require('../models/Post');

router.route('/').get((req, res) => {
    dbPost.find({"status":'A'}).sort({postDate: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error'+ err));
});

router.route('/post-recent').get((req, res) => {
    dbPost.find({"status":'A'}).limit(6).sort({postDate: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error'+ err));
});

router.route('/account/:id').get((req, res) => {
    dbPost.find({"account._id": req.params.id}).sort({postDate: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error'+ err));
});

router.route('/add').post((req, res) => {
    let account = req.body.account;
    let content = req.body.content;
    let postDate = moment(new Date());
    let images = req.body.images;
    let status = 'W';         // W: waiting (chờ duyệt), D: deleted (hủy bài đăng), A: accepted (chấp nhận)

    var newPost = new dbPost({account, content, postDate, images, status, sumLike: 0, interactions: [], comments: []});
    newPost.save()
        .then(() => res.json({result: newPost}))
        .catch(err => res.status(400).json('Error'+ err))
});
router.route('/:id').delete((req, res) =>{
    dbPost.findByIdAndDelete(req.params.id)
        .then(() => res.json({message: 'Bài đăng đã được xóa'}))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/update/:id').post((req, res) =>{
    // console.log(req.params);
    dbPost.findById(req.params.id)
        .then(post => {
            // xem lại nữa tăng sumLike và update comments []
            post.like = req.body.like

            post.save()
                .then(() => res.json({result: post}))
                .catch(err => res.status(400).json('Error' + err))
        })
        .catch(err => res.status(400).json('Error' + err)) 
});

/** handling 22/05/2020 */
router.route('/:id').get((req, res) =>{
    dbPost.findById(req.params.id)
        .then(post => res.json({post}))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/newlike/:id').post((req, res) => {
    let {interactions, sumLike} = req.body;
    dbPost.updateOne(
        {_id: req.params.id},
        {
            $push: { interactions: interactions },
            $set: { sumLike: sumLike }
        }
    ).then(result => res.json({result}))
    .catch(err => res.status(400).json('Error' + err));
});
router.route('/dislike/:id').post((req, res) => {
    let {interactions, sumLike} = req.body;
    dbPost.updateOne(
        {_id: req.params.id, "interactions._id": interactions.getIdInteract},
        {
            $set: { sumLike: sumLike, "interactions.$.like": false }
        }
    ).then(result => res.json({result}))
    .catch(err => res.status(400).json('Error' + err));
});
router.route('/likeagain/:id').post((req, res) => {
    let {interactions, sumLike} = req.body;
    dbPost.updateOne(
        {_id: req.params.id, "interactions._id": interactions.getIdInteract},
        {
            $set: { sumLike: sumLike, "interactions.$.like": true }
        }
    ).then(result => res.json({result}))
    .catch(err => res.status(400).json('Error' + err));
});
router.route('/comments/:id').post((req, res) => {
    let comment = req.body;
    comment.commentDate = moment(new Date());
    dbPost.updateOne(
        {_id: req.params.id},
        { $push: { comments: comment } }
    ).then(result => res.json({result}))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;