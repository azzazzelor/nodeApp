const bcrypt = require('bcryptjs');

exports.bcrptPassw = (password) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return err
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) {
                return err
            }
            return password = hash
        })
    })
};