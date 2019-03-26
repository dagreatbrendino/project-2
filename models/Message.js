module.exports = function (seqeulize, DataTypes){

    var Message = seqeulize.define("Message", {
        subject: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [5,50]
            }
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [5,50]
            }
        },
    })

    Message.associate = function(models){

        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'senderId',
                allowNull: false
            }
        })
        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'recepientId',
                allowNull: false
            }
        })
    }
    return Message
}