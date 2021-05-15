const { secret } = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Wallet } = require('../helpers/db');

const authenticate = async ({
    username,
    password
}) => {

    const user = await User.findOne({ username });
    if(user && bcrypt.compareSync(password, user.hash)){
        const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    };
};

const create = async params => {

    // validating user
    const existingUser = await User.findOne({ username: params.username });
    if(existingUser){
        throw `username ${params.username} is already taken`;
    };
    
    // assigning role
    const isFirst = !await User.findOne({ role: 'vendor' });
    params.role = isFirst ? 'vendor' : 'user';

    const user = new User(params);

    // hashing password
    if(params.password){
        user.hash = bcrypt.hashSync(params.password, 10);
    };

    // saving user
    await user.save();

    // create user wallet
    const wallet = new Wallet({
        owner: params.username,
        amount : isFirst ? 5000 : 500,
        isVendor: isFirst      
    });
    await wallet.save();

    // logging in user right away
    return await authenticate({
        username: params.username, 
        password: params.password
    });
};

module.exports = {
    authenticate,
    create,
};