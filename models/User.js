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
            allowNull: false
        }
    },{
    hooks: {
        beforeCreate:  function(user) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
      }
    });
    
    User.prototpye.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }
}