const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema({
    placedBy: { type: mongoose.Types.ObjectId, required: true },
    placedTime: { type: Number, required: true, default: +new Date() },
    products: { type: Array, required: true },
    status: { type: String, required: true, default: 'complete' }, // enum [complete, refund]
    amountProvided: { type: Array, required: true },
    amountReturned: { type: Array, required: true },
    refundAmount: { type: Array }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
});

module.exports = {
    orderModel: mongoose.model('Order', schema)
};