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
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [5]
            }
        }
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