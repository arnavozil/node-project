const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { frontendClient, localFrontendClient } = require('./config.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./helpers/jwt');
const userRoutes = require('./users/routes');
const productRoutes = require('./products/routes');
const orderRoutes = require('./orders/routes');
const walletRoutes = require('./wallet/routes');
const errorHandler = require('./helpers/errorHandler');

const PORT = process.env.PORT || 5000;
const isLocal = !process.env.PORT;

// cookie parser --> parse in the http cookie
app.use(cookieParser());

// body parser and cors boilerplate
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors({
    origin: isLocal ? localFrontendClient : frontendClient,
    credentials: true
}));

// authenticating routes via JsonWebToken
app.use(jwt());

// api routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/wallets', walletRoutes);

// error handling
app.use(errorHandler);

// listening to the server
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});