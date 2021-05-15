const expressJwt = require('express-jwt');
const { secret } = require('../config.json');

const jwt = () => expressJwt({
    secret,
    getToken: req => req.cookies.token,
    algorithms: ['HS256']
}).unless({
    path: [
        // all the public routes
        '/users/authenticate',
        '/users/register',
    ]
});

module.exports = jwt;