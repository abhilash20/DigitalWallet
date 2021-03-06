const express = require('express');
const router = new express.Router({mergeParams: true});
const usersService = require('./usersService');

async function createUser(req, res) {
    const user = req.body;
    // return usersService.createUser(user)
    //     .then(function (response){
    //         return res.status(response.statusCode).send(response.message);
    //     }).catch(function(err) {
    //         return res.status(err.statusCode).send(err.message);
    //     });
    //
    try {
        const response = await usersService.createUser(user)
        return res.status(response.statusCode).send(response.message);
    } catch(err) {
        return res.status(err.statusCode).send(err.message);
    }
}

async function getUser(req, res) {
    try {
        const response = await usersService.getUser(req.params.userId);
        return res.status(response.statusCode).send(response.message);
    } catch(err) {
        return res.status(err.statusCode).send(err.message);
    }
}



async function updateUser(req, res) {
    return usersService.updateUser(req.body , req.params.userId)
         .then(function (response){
             return res.status(response.statusCode).send(response.message);
         }).catch(function(err) {
             return res.status(err.statusCode).send(err.message);
         });
}


async function login(req, res) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    try {

        const response = await usersService.login(username,password);
        return res.status(response.statusCode).send(response.message);
    } catch(err) {
        return res.status(err.statusCode).send(err.message);
    }
}

router.post('/', createUser);
router.get('/:userId', getUser);
router.put('/:userId',  updateUser);
router.post('/login', login);
module.exports = router;
