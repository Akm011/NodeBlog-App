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
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

// Use the middleware for the '/posts/store' route
const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost);

//calling controllers
app.get('/', homePageController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePostController);
app.get('/post/:id', getPostController);
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);
app.get('/auth/register', createUserController);
app.post('/users/register', storeUserController);


app.listen(4000, () => {
    console.log("App listening on port 4000")
})