const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema({
    hash: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    role: { type: String, required: true },  // enum [vendor, user]
    createdAt: { type: Number, default: +new Date() },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id,
        delete ret.hash
    }
});

module.exports = {
    userModel: mongoose.model('User', schema)
};    