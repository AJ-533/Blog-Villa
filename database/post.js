const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username: String,
    title: String,
    description: String,
    content: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post' , PostSchema);

module.exports = Post;
