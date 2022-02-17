module.exports = (sequelize, DataTypes) =>{
    const OrderModel = sequelize.define("orders",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrement: 1000
        },
        userid:DataTypes.BIGINT,
        orderno:DataTypes.TEXT,
        total:DataTypes.FLOAT,
        qty:DataTypes.INTEGER,
        address:DataTypes.STRING,
        status:{
            type:DataTypes.INTEGER,
            defaultValue:1
        }
    });

    return OrderModel;
}