const { Router } = require('express');
const router = Router();
const walletServices = require('./services');
const { userOnly, vendorOnly } = require('../helpers/middlewares');

const getMyWallet = (req, res, next) => {
    walletServices.getMyWallet(req.body.username).then(wallet => {
        res.json({
            message: 'Wallet fetched successfully',
            wallet
        });
    }).catch(err => next(err));
};

const getAllWallet = (req, res, next) => {
    walletServices.getAllWallet().then(wallets => {
        res.json({
            message: 'Wallets fetched successfully',
            wallets
        });
    }).catch(err => next(err));
};

router.post('/getMy', userOnly, getMyWallet);
router.get('/getAll', vendorOnly, getAllWallet);

module.exports = router;