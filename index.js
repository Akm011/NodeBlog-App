const express = require('express')
const expressEdge = require('express-edge')
const bodyParser = require("body-parser");
const connectToMongoose = require("./database")
const fileUpload = require("express-fileupload");
const path = require('path');


const Post = require('./database/models/Post')

connectToMongoose();
const app = new express()

app.use(fileUpload())
app.use(express.static('public'))  //use public directory from here
app.use(expressEdge)  //.use add functionality to express
app.set('views', `${__dirname}/views`)
//Adding body parser to read data coming from browser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)  //gives all the posts in database
    res.render('index', {
        posts
    })
})


app.get('/about', (req, res) => {
    res.render('about')  //render the about.edge file which is a html format
})

app.get('/post/:id', async (req, res) => {
    console.log(req.params)
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})


app.post('/posts/store', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const { image } = req.files;
    const imagePath = path.resolve(__dirname, 'public/posts', image.name);

    image.mv(imagePath, async (error) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }

        try {
            await Post.create({
                ...req.body,
                image: `/posts/${image.name}` // Store the path to the image in the database
            });
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    });
});
// app.post('/posts/store', async (req, res) => {
//     console.log(req.files);
//     const { image } = req.files
//     image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
//         try {
//             await Post.create(req.body);
//             res.redirect('/');
//         } catch (error) {
//             console.error(error);
//             res.redirect('/');
//         }
//     })
// });

app.listen(4000, () => {
    console.log("App listening on port 4000")
})