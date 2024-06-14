const Post = require('../database/models/Post')

module.exports = async (req, res) =>{
    const posts = await Post.find({})
    // console.log(posts)  //gives all the posts in database
    console.log(req.session)  //if there is user id means user is logged in
    res.render('index', {
        posts
    })
};