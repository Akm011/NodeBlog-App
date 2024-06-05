const Post = require('../database/models/Post')
const path = require('path')

module.exports = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const { image } = req.files;
    const imagePath = path.resolve(__dirname, '..', 'public/posts', image.name);

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
}