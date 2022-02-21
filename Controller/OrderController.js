const db = require('../Models');
const Order = db.OrderModel;
const OrderItem = db.OrderItem;
const { validationResult } = require('express-validator');

//get all Order
exports.index = async (req, res)=>{
  await Order.findAll()
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
//user orders
exports.userorder = async (req, res)=>{
  const userId = req.userData.id;
    await Order.findAll({
        include:OrderItem,
        where:{
            userId:userId
        }
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var {userId, totalAmount, qty, address, cartItem}  = req.body;
    const userId = req.userData.id;
    if(cartItem.length > 0)
    {
        const orderno = 10002;
        await Order.create({userId, orderno, totalAmount, qty, address})
        .then(data => {
            const orderId = data.id;
            cartItem.forEach(async ( Item ) => {
                const {productId, qty, price, saleprice} = Item;
                await OrderItem.create({orderId, productId, qty, price, saleprice})
            });
            
            res.json({
              message:"order created",
              order:data,
            }).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:err.message
            });
        });
    }
}

//get single user
exports.edit = async (req, res)=>{
    await Order.findByPk(req.params.id,{
        include:OrderItem
    })
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
exports.update = async (req, res)=>{
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var {userId, totalAmount, qty, address, cartItem}  = req.body;
    if(cartItem.length > 0)
    {
        const orderno = 10002;
        await Order.update({userId, orderno, totalAmount, qty, address}, {
            where: { id: id }
          })
        .then(async (data)=> {
            const orderId = id;
            await OrderItem.destroy({
                where: { orderId: orderId }
            })
            cartItem.forEach(async ( Item ) => {
                const {productId, qty, price, saleprice} = Item;
                await OrderItem.create({orderId, productId, qty, price, saleprice})
            });
            res.json(data).status(200);
        })
        .catch(err => {
            res.status(201).send({
                message:err.message
            });
        });
    }
}

//delete
exports.delete = async (req, res)=>{
    const id = req.params.id;
    await Order.destroy({
      where: { id: id }
    })
    .then(async (num) => {
      if (num == 1) {
        await OrderItem.destroy({
            where: { orderId: id }
        })
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

