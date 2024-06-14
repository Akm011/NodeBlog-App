const User = require('../database/models/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                req.session.userId = user._id
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        } else {
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};