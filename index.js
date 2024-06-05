const express = require('express')
const expressEdge = require('express-edge')
const bodyParser = require("body-parser");
const connectToMongoose = require("./database")
const fileUpload = require("express-fileupload");

connectToMongoose();
const app = new express()

app.use(fileUpload())
app.use(express.static('public'))  //use public directory from here
app.use(expressEdge)  //.use add functionality to express
app.set('views', `${__dirname}/views`)
//Adding body parser to read data coming from browser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//controllers
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

const validateCreatePostMiddleware = (req, res, next) => {
    // Debug logging to see the content of req.files.image
    // console.log("req.files.image: ", req.files && req.files.image);

    // Check if req.files and req.files.image not exists
    if ((req.files && req.files.image) == null || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        // Redirect to '/posts/new' if an image file is not present
        console.log("Some fields were missing")
        return res.redirect('/posts/new');
    }

    // Proceed to the next middleware if no image file is detected
    next();
}

// Use the middleware for the '/posts/store' route
app.use('/posts/store', validateCreatePostMiddleware);

//calling controllers
app.get('/', homePageController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePostController);
app.get('/post/:id', getPostController);

app.listen(4000, () => {
    console.log("App listening on port 4000")
})