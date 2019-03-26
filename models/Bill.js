module.exports = function(sequelize, DataTypes){

    var Bill = sequelize.define("Bill", {
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
    Bill.associate = function(models){
        Bill.belongsTo(models.User, {
            foreignKey:{
                allowNull: false
            }
        });

        Bill.belongsTo(models.Group, {
            foreignKey:{
                allowNull: false
            }
        });
    }
    return Bill
}