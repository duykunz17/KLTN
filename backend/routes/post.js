const router = require('express').Router();
const dbPost = require('../models/Post');

router.route('/').get((req, res) => {
    dbPost.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error'+ err));
});

router.route('/account/:id').get((req, res) => {
    dbPost.find({"account._id": req.params.id}).sort({postDate: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error'+ err));
});

router.route('/add').post((req, res) => {
    console.log(req.body);
    let account = req.body.account;
    let content = req.body.content;
    let postDate = Date.parse(req.body.postDate);
    let images = req.body.images;
    let like = req.body.like;
    let comment = req.body.comment;

    const newPost = new dbPost({account, content, postDate, images, like, comment});
    newPost.save()
        .then(() => res.json('Post added'))
        .catch(err => res.status(400).json('Error'+ err))
})

router.route('/update/:id').post((req, res) =>{
    console.log(req.params);
    dbPost.findById(req.params.id)
        .then(post => {
            post.like = req.body.like

            post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error' + err))
        })
        .catch(err => res.status(400).json('Error' + err)) 
})

module.exports = router;