const { connectionString, localConnectionString } = require('../config.json');
const mongoose = require('mongoose');
const { userModel } = require('../users/model');
const { productModel } = require('../products/model');
const { orderModel } = require('../orders/model');
const { walletModel } = require('../wallet/model');

let url = connectionString;
if(process.env.NODE_ENV === 'development'){
    url = localConnectionString;
}

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

module.exports = {
    User: userModel,
    Product: productModel,
    Order: orderModel,
    Wallet: walletModel
};