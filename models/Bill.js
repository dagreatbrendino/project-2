module.exports = function(sequelize, DataTypes){

    var Bill = sequelize.define("Bill", {
        billName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        // quantity:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     validate: {
        //     isNumeric: true
        //     }
        // },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        fileUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        thumbUrl: {
            type: DataTypes.STRING,
            allowNull: true
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