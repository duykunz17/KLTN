const router = require('express').Router();

// call modle account database
const dbAcount = require('../modles/Account');

router.route('/login-social').post((req, res) => {
    let account = req.body;
    // Check whether the user exists or not?
    dbAcount.findOne({username: account.username}, (err, user) => {
        if (err) return res.json(err);
        
        // If the user exists, allow login
        if (user) return res.json({user});

        let newUser = new dbAcount ({
            username: account.username,
            roles: account.roles,
            avatar: account.avatar,
            person: {
                name: account.person.name,
                gender: account.person.gender,
                email: account.person.email
            }
            
        });
        newUser.save((err) => {
            return res.json({user: newUser});
        });
    });
});

router.route('/login-local').post((req, res) => {
    console.log(req.body);
    let { username, password } = req.body;
    dbAcount.findOne({username}, (err, user) => {
        if (err) return res.json(err);
        if (!user) return res.json({message: 'Không tìm thấy tài khoản'});
        if (!user.validPassword(password, user.password))   // if password is invalid
            return res.json({message: 'Sai mật khẩu'});

        return res.json({user});
    });
});

module.exports = router;