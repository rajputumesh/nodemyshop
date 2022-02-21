const db = require('../Models');
const Product = db.ProductModel;
const Category = db.CategoryModel;
const Brand = db.BrandModel;
const { validationResult } = require('express-validator');

//get all Product
exports.index = async (req, res)=>{
  await Product.findAll({
      attributes:['id','name','price','saleprice','image']
  })
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

//brand product
exports.brandproduct = async (req, res)=>{
    await Product.findAll({
            attributes:['id','name','price','saleprice','image'],
            include:{
                model:Category,
                attributes:['id','name']
            },
            where:{BrandId:req.params.id}
        })
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

//category product
exports.categoryproduct = async (req, res)=>{
    await Product.findAll({
            attributes:['id','name','price','saleprice','image'],
            include:{
                model:Category,
                attributes:['id','name']
            },
            where:{CategoryId:req.params.id}
        })
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
    const {name, brandId, categoryId, price, saleprice, description, short_description}  = req.body;
    if(req.image!=undefined){
        var image = req.image;
    }else{
        var image = '';
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Product.create({name, brandId, categoryId, price, saleprice, image, description, short_description})
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
    await Product.findByPk(req.params.id)
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

    await Product.update(params, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "Product Updated"
        });
      } else {
        res.json({
          message: "Product Not Found"
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
    await Product.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "Product Deleted"
        });
      } else {
        res.json({
          message: "Product Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

