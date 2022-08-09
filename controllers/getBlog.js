const Post =require('../database/models/post')

module.exports = function (req, res) {
    Post.findById(req.params.id, function (err, doc) {
      res.render('post.ejs', {
        doc: doc
      });
    });
  }