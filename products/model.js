const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignValidation = (type, required = true) => ({ type, required });

const schema = new Schema({
    name: assignValidation(String),
    price: assignValidation(Number),
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
});

module.exports = {
    productModel: mongoose.model('Product', schema)
};