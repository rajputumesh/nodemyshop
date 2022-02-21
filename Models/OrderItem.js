module.exports = (sequelize, DataTypes) =>{
    const OrderItem = sequelize.define("orderitems",{
        orderId:DataTypes.BIGINT,
        productId:DataTypes.BIGINT,
        qty:DataTypes.INTEGER,
        price:DataTypes.FLOAT,
        saleprice:DataTypes.FLOAT
    });
    return OrderItem;
}