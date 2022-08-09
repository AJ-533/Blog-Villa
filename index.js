const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const Post = require('./database/models/post');
const User = require('./database/models/User');
const app = express();
const ejs = require('ejs');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

const bodyParser = require('body-parser');
const { type } = require('os');


const homePageController = require('./controllers/homePage');
const blogListController = require('./controllers/blogList');
const getBlogController = require('./controllers/getBlog');
const createBlogController = require('./controllers/createBlog');
const storePostController = require('./controllers/storePost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController =require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
const auth = require("./middleware/auth");


// const mongoDB = 'mongodb+srv://Ashish:AshishDB@cluster0.7ialh.mongodb.net/local_library?retryWrites=true&w=majority'
// mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
//     console.log('You are now connected to Atlas!');
// }).catch((err) => console.log(`Couldn't Connect to Atlas`));

mongoose.connect("mongodb://localhost:27017/BLOG-VILLA_DATABASE", {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
}).then(() => {
  console.log('You are now connected to your database!');
}).catch((err) => console.log(`Couldn't Connect to Mongo`));



app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(fileUpload());
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: connectMongo.create({
    mongoUrl: 'mongodb://localhost:27017/BLOG-VILLA_DATABASE'
  })
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const storePost = (req, res, next) => {
  // if (req.body.username == "" || req.body.title == "" || req.body.description == "" || req.body.content == "") {
  //   return res.redirect('/posts/new')
  if (!req.body.username || !req.body.title || !req.body.description || !req.body.content) {
    return res.redirect('/posts/new')
  }

  next()
}
app.use('/posts/store', storePost)

// app.get('/index.html', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'pages/index.html'));
// });

// app.get('/about.html', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'pages/about.html'));
// });

// app.get('/contact.html', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
// });

// app.get('/post.html', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// });



app.get('/', homePageController);
app.get('/blogs', blogListController);
app.get('/posts/new', createBlogController);
app.post('/posts/store', storePostController);
app.get('/posts/:id', getBlogController);

app.get('/contact', (req, res) => {
  res.render('contact.ejs')
});

app.get('/auth/register', createUserController);
app.get('/auth/login', loginController);
app.post("/users/register", storeUserController);
app.post("/users/login", loginUserController);


app.get("/posts/:id/edit", function (req, res) {
  Post.findById(req.params.id, function (err, currBlog) {
    if (err) {
      res.render("index.ejs");
    } else {
      res.render("edit.ejs", { currBlog });
    }
  });

});

//UPDATE ROUTE=================
app.put("/posts/:id", function (req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body.Post, function (err, updatedBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/posts/" + req.params.id);
    }
  });
});

//DESTROY ROUTE==============
app.delete("/posts/:id", function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});


app.listen(4000, () => {
  console.log('App listening on port 4000')
});