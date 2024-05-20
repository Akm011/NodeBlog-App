const express = require('express')
const path = require('path')
const app = new express()
const expressEdge = require('express-edge')
// const connectToMongoose = require("./database")

// connectToMongoose();

app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/about', (req,res)=>{
    res.render('about')  //render the about.edge file which is a html format
})

app.get('/post', (req,res)=>{
    res.render('post')
})

app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.listen(4000, ()=>{
    console.log("App listening on port 4000")
})