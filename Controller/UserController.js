const db = require('../Models');
//const Op = db.Sequelize.Op;
const Users = db.UserModel;
const { validationResult } = require('express-validator');

//get all Users
exports.index = (req, res)=>{
  var condition = { role: 2 };
  Users.findAll({ where: condition })
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
    var params  = req.body;
    console.log('params ',params);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let data = await Users.create(params)
    .then(data => {
      res.json(data).status(200);
    })
    .catch(err => {
      res.status(500).send({
        message:err.message
      });
    });
}

//get single user
exports.edit = (req, res)=>{
  Users.findByPk(req.params.id)
  .then(data => {
    res.json(data).status(200);
  })
  .catch(err => {
    res.status(500).send({
      message:err.message
    });
  });
}

//update user data
exports.update = (req, res)=>{

    const id = req.params.id;
    var params  = req.body;
    console.log('params ',params);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(400).json({ errors: errors.array() });
    }

    Users.update(params, {
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
exports.delete = (req, res)=>{
    const id = req.params.id;
    Users.destroy({
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

