const path = require('path')
const Post =require('../database/models/post')

module.exports = (req, res) => {
    // let newPost = new Post({
    //   username: req.body.username,
    //   title: req.body.title,
    //   description: req.body.description,
    //   content: req.body.content
    // });
    const image = req.files.image;
  
    image.mv(path.resolve(__dirname, '/public/images', image.name), (error) => {
      Post.create({
        ...req.body,
        image: `images/${image.name}`
      }).then(() => {
        console.log('New Blog Added!');
      }).catch((err) => console.log(`Couldn't Create your Blog...`));
      res.redirect('/');
    });
  }