const { Router } = require('express');
const router = Router();
const productServices = require('./services');
const { vendorOnly } = require('../helpers/middlewares');

const addProduct = (req, res, next) => {
    console.log(res.locals.kaam);
    productServices.addProduct({ ...req.body }).then(() => {
        res.json({
            message: 'Product added successfully'
        });
    }).catch(err => next(err));
};

const getProductById = (req, res, next) => {
    productServices.getProductById(req.body.id).then(product => {
        res.json({
            product,
            message: 'Product fetched successfully'
        });
    }).catch(err => next(err));
};

const getAllProducts = (req, res, next) => {
    productServices.getAllProducts().then(products => {
        res.json({
            products,
            message: 'All products fetched successfully'
        });
    }).catch(err => next(err));
};

router.post('/add', vendorOnly, addProduct);
router.post('/get', getProductById);
router.get('/getAll', getAllProducts);

module.exports = router;