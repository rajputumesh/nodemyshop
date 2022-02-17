module.exports = (sequelize, DataTypes) =>{
    const OrderItem = sequelize.define("orderitems",{
        orderid:DataTypes.BIGINT,
        productid:DataTypes.BIGINT,
        qty:DataTypes.INTEGER,
        price:DataTypes.FLOAT,
        saleprice:DataTypes.FLOAT
    });
    return OrderItem;
}