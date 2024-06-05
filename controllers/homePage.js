const Post = require('../database/models/Post')

module.exports = async (req, res) =>{
    const posts = await Post.find({})
    // console.log(posts)  //gives all the posts in database
    res.render('index', {
        posts
    })
};