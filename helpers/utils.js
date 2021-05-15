const { VALID } = require('./middlewares');

const distributeMoney = (rem, denominations = VALID) => {
    if(rem === 0){
        return [];
    };
    const copy = [...denominations];
    const res = [];
    while(rem){
        if(rem < copy[0]){
            copy.splice(0, 1);
        }else{
            res.push(copy[0]);
            rem -= copy[0];
        };
    };
    return res;
};

module.exports = {
    distributeMoney
};