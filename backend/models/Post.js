const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: {type: String} ,
    postDate: {type: Date} ,
    images: [],
    like: {type: Number},
    comment: {type: Number},
    account: {type: Object}
}, {
    timestamps: true,
});

const PostData = mongoose.model('Post', postSchema);

module.exports = PostData;