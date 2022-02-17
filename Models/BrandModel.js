module.exports = (sequelize, DataTypes) =>{
    const BrandModel = sequelize.define("brands",{
        name:DataTypes.STRING,
        status:{
            type:DataTypes.INTEGER,
            defaultValue:1
        }
    });
    return BrandModel;
}