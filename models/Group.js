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
    };
    return Group;
}