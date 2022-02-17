const { check } = require('express-validator');
exports.stote = [
    check('name','Name is Requried').notEmpty(),
]

exports.update = [
    check('name','Name is Requried').notEmpty(),
]