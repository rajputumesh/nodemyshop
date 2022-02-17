const { Sequelize, DataTypes} = require('sequelize');

const sequelize =new Sequelize('mynodedb','root','mysql@123',{
    host:'localhost',
    logging:false,
    dialect:'mysql',
    pool:{max:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(()=>{
    console.log('Connected');
})
.catch(err=>{
    console.log('error ',err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ProductModel = require('./ProductModel')(sequelize, DataTypes);
db.UserModel = require('./UserModel')(sequelize, DataTypes);
db.CategoryModel = require('./CategoryModel')(sequelize, DataTypes);
db.BrandModel = require('./BrandModel')(sequelize, DataTypes);
db.OrderModel = require('./OrderModel')(sequelize, DataTypes);
db.OrderItem = require('./OrderItem')(sequelize, DataTypes);
module.exports = db;
