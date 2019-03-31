module.exports = function(sequelize, DataTypes){

    var Chore = sequelize.define("Chore", {
        chore: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 150]
            }
        },
        recurDate: {
            type: DataTypes.STRING,
            validate:{
                len: [3]
            }
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
        
        
    });
    //Associating the chores table with the user and group table 
    Chore.associate = function(models){

        Chore.belongsTo(models.User, {
            foreignKey:{
                allowNull: false
            }
        });

        Chore.belongsTo(models.Group, {
            foreignKey:{
                allowNull: false
            }
        });
    }
   
    return Chore
}