const { check } = require('express-validator');
exports.store = [
    check('name','Name is Requried').notEmpty(),
    check('phone','Phone is Requried').notEmpty(),
    check('email','Email is Requried or already exist').notEmpty(),
    check('pass','Password must be in 6 charactors').isLength({min:6})
]

exports.update = [
    check('name','Name is Requried').notEmpty(),
    check('phone','Phone is Requried').notEmpty(),
    check('email','Phone is Requried').notEmpty()
]

exports.auth = [
    check('email','Email is Requried').notEmpty(),
    check('password','Password Requried').notEmpty()
]
