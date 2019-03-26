var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes){

    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5,36]
            }
        }

    },{
    hooks: {
        beforeCreate:  function(user) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
      }
    });
    
    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }
    //associating the Users table to the Groups table. The user will be given a foreign key
    //that references the group they join
    User.associate = function(models){

        User.belongsTo(models.Group, {
            foreignKey:{
                allowNull: true
            }
        }),

        User.hasMany(models.Chore, {

        }),
        User.hasMany(models.Grocery, {

        }),
        User.hasMany(models.Bill, {

        });
    }
    return User
}