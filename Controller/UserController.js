const db = require('../Models');
const bcrypt = require('bcrypt');
//const Op = db.Sequelize.Op;
const Users = db.UserModel;
const { validationResult } = require('express-validator');

//get all Users
exports.index = async (req, res)=>{
  await Users.findAll({ 
      attributes:['name','phone','email'],
      where:{role:2}
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

//store user data
exports.store = async (req, res)=>{
    const {name, phone, email, pass}  = req.body;
    const password = await bcrypt.hash(pass, 10);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let data = await Users.create({name, phone, email, password})
    .then(data => {
      res.json({
        name:data.name,
        email:data.email,
        phone:data.phone
      }).status(200);
    })
    .catch(err => {
      res.status(500).send({
        message:err.message
      });
    });
}

//get single user
exports.edit = async (req, res)=>{
    await Users.findByPk(
      {
        attributes:['name','phone','email']
      }
      ,req.params.id
    )
    .then(data => {
        res.json({
          name:data.name,
          email:data.email,
          phone:data.phone
        }).status(200);
    })
    .catch(err => {
        res.status(500).send({
        message:err.message
        });
    });
}

//update user data
exports.update = async (req, res)=>{

    const id = req.params.id;
    const {name, phone, email}  = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(400).json({ errors: errors.array() });
    }

    await Users.update({name, phone, email}, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "User Updated"
        });
      } else {
        res.json({
          message: "User Not Found"
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
    await Users.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "User Deleted"
        });
      } else {
        res.json({
          message: "User Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.logout = async (req, res)=>{
   
}

