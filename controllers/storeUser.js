const User = require('../database/models/User')

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        if(error){
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.session.registrationErrors = registrationErrors
            res.redirect('/auth/register')
        }
        console.error("User creation error");
        // res.status(500).send('Internal Server Error');
    }
}

