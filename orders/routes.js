const { Router } = require('express');
const router = Router();
const orderServices = require('./services');
const { userOnly, validateDenominations, countPrice, vendorOnly } = require('../helpers/middlewares');

const getMyOrders = (req, res, next) => {
    orderServices.getMyOrders(req.user.sub).then(orders => {
        res.json({
            message: 'Orders fetched successfully',
            orders
        });
    }).catch(err => next(err));
};

const getAllOrders = (req, res, next) => {
    orderServices.getAllOrders().then(orders => {
        res.json({
            message: 'Orders fetched successfully',
            orders
        });
    }).catch(err => next(err));
};

const resetOrders = (req, res, next) => {
    orderServices.resetOrders().then(() => {
        res.json({
            message: 'Orders resetted successfully',
        });
    }).catch(err => next(err));
};

const getOrderAmount = (req, res, next) => {
    orderServices.getAmount().then(amount => {
        res.json({
            message: 'Amount fetched successfully',
            amount
        });
    }).catch(err => next(err));
};

const placeOrder = (req, res, next) => {
    const { remainingAmount } = res.locals;
    orderServices.placeOrder({ userId: req.user.sub, remainingAmount, ...req.body }).then(order => {
        res.json({
            message: 'Order placed successfully',
            order
        });
    }).catch(err => next(err));
};

const requestRefund = (req, res, next) => {
    orderServices.requestRefund(req.body.id, req.user.sub).then(order => {
        res.json({
            message: 'Refund request successful',
            order
        });
    }).catch(err => next(err));
}

router.get('/getMy', userOnly, getMyOrders);
router.get('/getAll', vendorOnly, getAllOrders);
router.get('/reset', vendorOnly, resetOrders);
router.get('/getAmount', vendorOnly, getOrderAmount);
router.post('/place', userOnly, countPrice, validateDenominations, placeOrder);
router.post('/refund', userOnly, requestRefund);

module.exports = router;