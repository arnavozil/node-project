const { User, Product, Wallet } = require("./db");
const { Types } = require('mongoose');
const VALID = [25, 10, 5, 1];

const vendorOnly = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.sub);
        if(!user || user.role !== 'vendor') throw 'This feature is only accessible via a vendor account';
        next();
    } catch (err) {
        next(err);  
    }
};

const userOnly = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.sub);
        if(!user || user.role !== 'user') throw 'This feature is only accessible via a user account';
        next();
    } catch (err) {
        next(err);  
    }
};

const countPrice = async (req, res, next) => {
    try {
        const { products } = req.body;
        const productIds = Object.keys(products);
        let sum = 0;
        const desiredProducts = await Product.find({
            _id: { $in: productIds.map(Types.ObjectId) }
        });
        desiredProducts.forEach(pro => sum += pro.price * products[pro.id]);
        res.locals.totalAmount = sum;
        next();
    } catch (error) {
        next(error);
    }
}

const validateDenominations = async (req, res, next) => {
    try {
        const { amountProvided } = req.body;
        const { totalAmount } = res.locals;
        const invalidAmount = amountProvided.find(denom => !VALID.includes(denom));
        if(invalidAmount){
            throw `${invalidAmount} is an invalid denomination`;
        };
        const provided = amountProvided.reduce((acc, val) => acc + val, 0);
        if(totalAmount > provided){
            throw `Insufficient funds to buy the product(s)`;
        };
        
        const { username } = await User.findById(req.user.sub);
        const {amount: vendorAmount} = await Wallet.findOne({ isVendor: true });
        const {amount: userAmount} = await Wallet.findOne({ owner: username });
        if(vendorAmount < provided - totalAmount){
            throw  `Vendor cannot bear appropriate changes`;
        };
        console.log(vendorAmount, userAmount, totalAmount);
        if(userAmount < totalAmount){
            throw 'You don\'t have enought fund to buy these products';
        };
        res.locals.remainingAmount = provided - totalAmount;
        next();
    } catch (err) {
        next(err);
    };
};

module.exports = {
    userOnly, 
    vendorOnly,
    countPrice,
    validateDenominations,
    VALID,
};