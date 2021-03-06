const db = require('../Models');
const Brands = db.BrandModel;
const { validationResult } = require('express-validator');

//get all Brands
exports.index = async (req, res)=>{
  await Brands.findAll()
  .then(data => {
    res.json(data).status(200);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Opps: somthing wrong."
    });
  });
}

//store Brand data
exports.store = async (req, res)=>{
    const params  = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let data = await Brands.create(params)
    .then(data => {
      res.json(data).status(200);
    })
    .catch(err => {
      res.status(500).send({
        message:err.message
      });
    });
}

//get single Brand
exports.edit = async (req, res)=>{
    await Brands.findByPk(req.params.id)
    .then(data => {
        res.json(data).status(200);
    })
    .catch(err => {
        res.status(500).send({
        message:err.message
        });
    });
}

//update Brand data
exports.update = async (req, res)=>{

    const id = req.params.id;
    const params  = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(400).json({ errors: errors.array() });
    }

    await Brands.update(params, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "Brand Updated"
        });
      } else {
        res.json({
          message: "Brand Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

//delete
exports.delete = async (req, res)=>{
    const id = req.params.id;
    await Brands.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "Brand Deleted"
        });
      } else {
        res.json({
          message: "Brand Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

