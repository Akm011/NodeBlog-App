const User = require('../database/models/User')

module.exports = async (req, res, next) => {
    //fetch user form database
    //verify user
    //if valid user, permit request
    //else redirect
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/');
        }
        next();
    } catch (error) {
        return res.redirect('/');
    }
}