const { Router } = require('express');
const router = Router();
const userServices = require('./services');

const sendUser = (res, user, errorMessage) => {
    if(user){
        // send user token as a cookie
        res.cookie('token', user.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none'
        });
        delete user.token;
        res.json(user);
    }else{
        res.status(400).json({
            message: errorMessage
        });
    };
}

const authenticate = (req, res, next) => {
    userServices.authenticate(req.body).then(user => {
        sendUser(res, user, 'username or password is incorrect');
    }).catch(err => next(err));
};

const register = (req, res, next) => {
    userServices.create(req.body).then(user => {
        sendUser(res, user, 'Error while creating the account');
    }).catch(err => next(err));
};


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);

module.exports = router;