const path = require('path');

const express = require('express');

const mongoose = require('mongoose');

const Post = require('./database/models/post');

const app = express();

const bodyParser = require('body-parser');

const mongoDB = 'mongodb+srv://Ashish:AshishDB@cluster0.7ialh.mongodb.net/local_library?retryWrites=true&w=majority'
mongoose.connect(mongoDB,{useNewUrlParser: true, useCreateIndex : true, useUnifiedTopology: true, useFindAndModify : false}).then(() => {console.log('Yoe are now connected to Mongo!');
}).catch((err) => console.log('Something went wrong'));

app.use(express.static('public'));
const { config, engine } = require('express-edge');
const { title } = require('process');
 
// Configure Edge if need to
config({ cache: process.env.NODE_ENV === 'production' });
 
// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('index');    
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/about.html',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.get('/posts/new', (req,res) =>{
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    let newPost= new Post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    })
    newPost.save();
    res.redirect('/')
});

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});

app.listen(4000, () => {
    console.log('App listening on port 4000')
}); 
 
 
 
