module.exports = (sequelize, DataTypes) =>{
    const CategoryModel = sequelize.define("categories",{
        name:DataTypes.STRING,
        status:{
            type:DataTypes.INTEGER,
            defaultValue:1
        }
    });

    return CategoryModel;
}