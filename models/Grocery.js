module.exports = function(sequelize, DataTypes){

    var Grocery = sequelize.define("Grocery", {
        groceryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
            isNumeric: true
            }
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        } 
        
        
    });
    //Associating the grocery table with the user and group table 
    Grocery.associate = function(models){

        Grocery.belongsTo(models.User, {
            through: models.Group,
            foreignKey:{
                allowNull: true
            }
        });

        Grocery.belongsTo(models.Group, {
            foreignKey:{
                allowNull: false
            }
        });
    }
    return Grocery
}