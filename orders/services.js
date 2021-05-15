const { Order, Wallet, User } = require("../helpers/db");
const { distributeMoney } = require("../helpers/utils");

const sum = arr => arr.reduce((acc, val) => acc + val, 0);

const getMyOrders = async userId => await Order.find({ id: userId });

const getAllOrders = async () => await Order.find();

const resetOrders = async () => await Order.deleteMany({});

const getAmount = async () => await Order.find().reduce((acc, val) => acc + sum(val.amountProvided) - sum(val.amountReturned), 0);

const placeOrder = async ({
    products, userId,
    amountProvided, remainingAmount
}) => {
    const amountReturned = distributeMoney(remainingAmount);
    const d = await Wallet.updateOne({ isVendor: true }, {
        $inc: { amount: sum(amountProvided) - remainingAmount }
    });

    const { username } = await User.findById(userId);
    await Wallet.updateOne({
        owner: username
    }, { $inc: { amount: -(sum(amountProvided) - remainingAmount) } });

    const order = new Order({
        amountProvided, placedBy: userId, 
        products, amountReturned
    });
    return await order.save();
};

const requestRefund = async (orderId, userId) => {
    const order = await Order.findById(orderId);
    const refund = sum(order.amountProvided) - sum(order.amountReturned);
    const refundAmount = distributeMoney(refund);

    const { username } = await User.findById(userId);
    
    await Wallet.updateOne({ owner: username }, { 
        $inc: { amount: refund } 
    });

    await Wallet.updateOne({ isVendor: true }, {
        $inc: { amount: -refund }
    });


    await Order.findByIdAndUpdate(order, {
        $set: { refundAmount, status: 'refund' }
    });

    return Order.findById(orderId);
};

module.exports = {
    getMyOrders,
    getAllOrders,
    resetOrders,
    getAmount,
    placeOrder,
    requestRefund
}