const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
// call modle account database
const dbAcount = require('../models/Account');

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
        if (!user) return res.json({message: 'Tài khoản không tồn tại'});
        if (!user.validPassword(password, user.password))   // if password is invalid
            return res.json({message: 'Sai mật khẩu'});

        return res.json({user});
    });
});

router.route('/add').post( (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null);
    const newUser = new dbAcount({"person.name":name, "person.email": email, username, password});
    console.log(newUser);

    dbAcount.findOne({'username' : username}, 'username') // chỉ select username để so sánh với req.body.username
    .then(data => {
        if(data === null){
            newUser.save()
            .then(res.json({username}))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            return res.json({message: 'Tài khoản đã tồn tại'});
        }
    })
    .catch(err => {
        res.status(400).json('Error: ' + err);
    });
    
})

module.exports = router;