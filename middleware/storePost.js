module.exports = (req, res, next) => {
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