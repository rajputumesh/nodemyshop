const { check } = require('express-validator');
exports.stote = [
    check('name','Name is Requried').notEmpty(),
    check('brandid','Brand is Requried').notEmpty(),
    check('categoryid','Category is Requried').notEmpty(),
    check('price','Price is Requried').notEmpty(),
    check('saleprice','Sale Price is Requried').notEmpty(),
    check('image','Image be in 6 charactors').notEmpty(),
    check('description','Description is Requried').notEmpty(),
    check('short_description','Short Description is Requried').notEmpty(),
]

exports.update = [
    check('name','Name is Requried').notEmpty(),
    check('brandid','Brand is Requried').notEmpty(),
    check('categoryid','Category is Requried').notEmpty(),
    check('price','Price is Requried').notEmpty(),
    check('saleprice','Sale Price is Requried').notEmpty(),
    check('image','Image be in 6 charactors').notEmpty(),
    check('description','Description is Requried').notEmpty(),
    check('short_description','Short Description is Requried').notEmpty(),
]