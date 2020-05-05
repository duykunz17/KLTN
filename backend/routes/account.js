const router = require('express').Router();
// call modle account database
const dbAcount = require('../models/Account');

router.route('/login-social').post((req, res) => {
    let account = req.body;
    // Check whether the user exists or not?
    dbAcount.findOne({username: account.username}, (err, user) => {
        if (err) return res.json(err);
        
        // If the user exists, allow login
        if (user) return res.json({user});

        let avatar = account.avatar ? account.avatar : "https://firebasestorage.googleapis.com/v0/b/testapi-272015.appspot.com/o/images%2Faccount_anonymous.jpeg?alt=media&token=4cc2ecef-33dc-4ed0-9135-64d44aef42bd";
        let email = account.person.email ? account.person.email : '';
        let gender = account.person.gender ? account.person.gender : true;

        let newUser = new dbAcount ({
            username: account.username,
            roles: account.roles,
            avatar: avatar,
            person: {
                name: account.person.name,
                gender: gender,
                phone: '',
                address: '',
                email: email
            }
            
        });
        newUser.save((err) => {
            return res.json({user: newUser});
        });
    });
});

router.route('/login-local').post((req, res) => {
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
    let { name, email, username, password } = req.body;
    dbAcount.findOne({'username' : username}, 'username') // chỉ select username để so sánh với req.body.username
        .then(data => {
            if(data === null){
                let newUser = new dbAcount({
                    username: username,
                    roles: 2,
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/testapi-272015.appspot.com/o/images%2Faccount_anonymous.jpeg?alt=media&token=4cc2ecef-33dc-4ed0-9135-64d44aef42bd',
                    person: {
                        name: name,
                        gender: true,
                        phone: '',
                        address: '',
                        email: email
                    }
                });
                newUser.password = newUser.encryptPassword(password);
                newUser.save()
                    .then(res.json({username}))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            else
                return res.json({message: 'Tài khoản đã tồn tại'});
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

router.route('/update-info/:id').post((req, res) => {
    let user = req.body;
    dbAcount.findById(req.params.id)
        .then(acc => {
            acc.avatar = user.avatar;
            acc.person.name = user.person.name;
            acc.person.gender = user.person.gender;
            acc.person.phone = user.person.phone;
            acc.person.address = user.person.address;
            acc.person.email = user.person.email;

            acc.save()
                .then(() => res.json({messSuccess: 'Cập nhật thông tin thành công'}))
                .catch(err => res.status(400).json('Error' + err));
        })
})

module.exports = router;