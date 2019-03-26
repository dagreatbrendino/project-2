module.exports = function(sequelize, DataTypes){

    var Group = sequelize.define("Group", {
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 40]
            }
        }
    });
    //Associating the group table with the user table 
    Group.associate = function(models) {

        Group.hasMany(models.User, {
            
        });
        Group.belongsTo(models.User, {
            foreignKey: {
                name: 'creatorId',
                allowNull: false
              },
            constraints: false
        })
        Group.hasMany(models.Chore, {

        });
        Group.hasMany(models.Grocery, {

        });
        Group.hasMany(models.Bill, {

        });
    };
    return Group;
}