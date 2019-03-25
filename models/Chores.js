module.exports = function(sequelize, DataTypes){

    var Chores = sequelize.define("Chores", {
        chore: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 150]
            }
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        } 
        
        
    });
    //Associating the chores table with the user and group table 
    Chores.associate = function(models){

        Chores.belongsTo(models.User, {
            foreignKey:{
                allowNull: false
            }
        });

        Chores.belongsTo(models.Group, {
            foreignKey:{
                allowNull: false
            }
        });
    }
   
    return Chores
}