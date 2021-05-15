const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    owner: { type: String, require: true },
    amount: { type: Number },
    isVendor: { type: Boolean }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
});

module.exports = {
    walletModel: mongoose.model('Wallet', schema)
};