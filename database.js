const mongoose = require('mongoose')

const Post = require('./database/models/Post')

const mongoURI = "mongodb://127.0.0.1:27017/NodeBlog";

const connectToMongoose = () => {
  try{
    mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Mongo error",err));
  }catch(err){
    console.log(err)
  }
}
module.exports = connectToMongoose;