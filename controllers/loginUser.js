const User = require('../database/models/User')
const bcrypt = require('bcrypt')

// module.exports = (req, res) => {
//     //try to find the user
//     //compare user password

//     //if pwd is correct, then login user

//     //else redirect user back
//     const { email, password } = req.body;
//     User.findOne({ email: email }, (error, user) => {
//         if(user){
//             bcrypt.compare(password, user.password, (error, same) => {
//                 if(same){
//                     res.redirect('/')
//                 } else {
//                     res.redire('auth/login')
//                 }
//             })
//         } else {
//             return res.redirect('/auth/login')
//         }
//     })


//     res.redirect('/')
// }

module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
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