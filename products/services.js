const { Product } = require('../helpers/db');

const addProduct = async ({ name, price }) => {
    const existingProduct = await Product.findOne({ name });
    if(existingProduct){
        throw `Product ${name} already exists.`;
    };
    const product = new Product({ name, price });
    await product.save();
};

const getProductById = async pid => await Product.findById(pid);

const getAllProducts = async () => await Product.find();

module.exports = {
    addProduct, 
    getProductById, 
    getAllProducts
};