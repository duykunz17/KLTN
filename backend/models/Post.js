const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: {type: String},
    postDate: {type: Date},
    images: [],
    account: {type: Object},
    sumLike: {type: Number},
    sumComment: {type: Number},
    status: {type: String},
    interactions: []
}, {
    timestamps: true,
});

const PostData = mongoose.model('Post', postSchema);

module.exports = PostData;