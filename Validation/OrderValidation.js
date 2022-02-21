const { check } = require('express-validator');
exports.stote = [
    check('address','Address is Requried').notEmpty(),
    check('userId','UserId is Requried').notEmpty(),
    check('qty','Phone is Requried').notEmpty(),
    check('totalAmount','Total Amount is Requried').notEmpty(),
    check('cartItem','cart Items is Requried').notEmpty(),
]

exports.update = [
    check('address','Address is Requried').notEmpty(),
    check('userId','UserId is Requried').notEmpty(),
    check('qty','Phone is Requried').notEmpty(),
    check('totalAmount','Total Amount is Requried').notEmpty(),
    check('cartItem','cart Items is Requried').notEmpty(),
]