module.exports = (sequelize, DataTypes) =>{
    const UserModel = sequelize.define("users",{
        name:DataTypes.STRING,
        role:{
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:2
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:DataTypes.STRING
    });
    return UserModel;
}