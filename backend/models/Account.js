const mongoose = require('mongoose');

// Encrypt password
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String,
    roles: Number,
    avatar: String,
    person: {
        name: String,
        gender: Boolean,
        phone: String,
        address: String,
        email: String
    }
}, {
    timestamps: true,
});

accountSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
accountSchema.methods.validPassword = (password, encryptPassword) => {
    return bcrypt.compareSync(password, encryptPassword);
}

const AccountData = mongoose.model('Account', accountSchema);

module.exports = AccountData;