const express = require('express')
const expressEdge = require('express-edge')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const mongoose = require('mongoose')
const connectFlash = require('connect-flash')

const app = new express()
const mongoURI = "mongodb://127.0.0.1:27017/NodeBlog";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Mongo error", err));

app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
        mongoUrl: mongoURI
    })
}))
app.use(connectFlash());
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
const auth = require('./middleware/auth')


//calling controllers
app.get('/', homePageController);
app.get('/posts/new', auth, createPostController);  //calling auth middleware
app.post('/posts/store', auth, storePost, storePostController);
app.get('/post/:id', getPostController);
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);
app.get('/auth/register', createUserController);
app.post('/users/register', storeUserController);


app.listen(4000, () => {
    console.log("App listening on port 4000")
})