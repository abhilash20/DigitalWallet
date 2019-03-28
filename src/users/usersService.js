var Users = require('../models/users');

function createUser(user) {
    var user = new Users({
        name: user.name,
        username: user.username,
        password: 'password',
        created_at: new Date().getTime(),
    });
    return new Promise(function(resolve, reject){
        user.save(function(err) {
            if (err) {
                return reject({
                    statusCode: 500,
                    message: "problem with creating the user",
                });
            }
            return resolve({
                statusCode: 201,
                message: "Successfully created the user",
            });
        });
    });
}

function getUser(userId) {
    return new Promise((resolve, reject) => {
        Users.findOne({ username: userId }, (err, user) => {
            if (err) {
                return reject({
                    statusCode: 500,
                    message: "problem with retrieving the user",
                });
            }
            return resolve({
                statusCode: 200,
                message: user,
            });
        })
    })
}



function updateUser(userBody,userId) {
    return new Promise((resolve, reject) => {
        Users.findOneAndUpdate({ username: userId }, userBody,{returnNewDocument : true }, function(err, user) {
            if (err) {
                return reject({
                    statusCode: 500,
                    message: "problem with updating the user",
                });
            }
            console.log(user);
            return resolve({
                statusCode: 200,
                message: user,
            });
        })
    })
}










module.exports = {
    createUser,
    getUser,
    updateUser,
    }
