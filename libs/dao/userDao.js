const User = require('../model/m_user');

exports.findUserById = userId => {
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, user) => {
            if(err) {
                return reject(err)
            }
            return resolve(user)
        })
    })
};

exports.findUserByParams = params => {
    return new Promise((resolve, reject) => {
        User.findOne(params, (err, user) => {
            if(err) {
                return reject(err)
            }
            return resolve(user)
        })
    })
};

exports.createUser = params => {
    return new Promise((resolve, reject) => {
        User.create(params, function (err, user) {
            if(err) {
                return reject(err)
            }
            return resolve(user)
        })
    })
};

exports.saveUser = user => {
    return new Promise((resolve, reject) => {
        user.save().then(newUser => {
            return resolve(newUser)
        }).catch(err => {
            return reject(err)
        })
    })
};