const express = require("express");
const ProductController = require('../Controller/ProductController');
const router = express.Router();

router
.route('/user')
.get('/user',ProductController.index);

module.exports = router;

