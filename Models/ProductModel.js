module.exports = (sequelize, DataTypes) =>{
    const ProductModel = sequelize.define("products",{
        name:DataTypes.STRING,
        brandid:DataTypes.INTEGER,
        categoryid:DataTypes.INTEGER,
        price:DataTypes.FLOAT,
        saleprice:DataTypes.FLOAT,
        image:{
            type:DataTypes.STRING,
            defaultValue:'demopro.png'
        },
        description:DataTypes.TEXT,
        short_description:DataTypes.STRING,
        status:{
            type:DataTypes.INTEGER,
            defaultValue:1
        }
    });

    return ProductModel;
}