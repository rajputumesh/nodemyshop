const { check } = require('express-validator');
exports.stote = [
    check('name','Name is Requried').notEmpty(),
    check('brandId','Brand is Requried').notEmpty(),
    check('categoryId','Category is Requried').notEmpty(),
    check('price','Price is Requried').notEmpty(),
    check('saleprice','Sale Price is Requried').notEmpty(),
    check('description','Description is Requried').notEmpty(),
    check('short_description','Short Description is Requried').notEmpty(),
]

exports.update = [
    check('name','Name is Requried').notEmpty(),
    check('brandId','Brand is Requried').notEmpty(),
    check('categoryId','Category is Requried').notEmpty(),
    check('price','Price is Requried').notEmpty(),
    check('saleprice','Sale Price is Requried').notEmpty(),
    check('description','Description is Requried').notEmpty(),
    check('short_description','Short Description is Requried').notEmpty(),
]