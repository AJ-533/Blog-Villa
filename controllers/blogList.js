const Post = require('../database/models/post')

module.exports = (req, res) => {
    Post.find({}, function (err, post) {
      res.render('index.ejs', {
        postList: post
      })
    })
  }