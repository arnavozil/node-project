const { Wallet } = require("../helpers/db");

const getMyWallet = async username => await Wallet.find({ owner: username });

const getAllWallet = async () => await Wallet.find();

module.exports = {
    getMyWallet,
    getAllWallet
};