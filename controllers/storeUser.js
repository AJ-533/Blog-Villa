const User = require('../database/models/User');

module.exports = (req, res,next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      console.log(`Couldn't add the new User`);
      res.redirect('/auth/register')
    }
    res.redirect('/')
})
  }