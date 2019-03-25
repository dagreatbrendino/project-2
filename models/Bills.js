module.exports = function(sequelize, DataTypes){

    var Bills = sequelize.define("Bills", {
        listItem: {
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
        totalAmount: {
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
    //Associating the bills table with the user and group table 
    Bills.associate = function(models){

        Bills.belongsTo(models.User, {
            through: models.Group,
            foreignKey:{
                allowNull: true
            }
        });
    }
    return Bills
}