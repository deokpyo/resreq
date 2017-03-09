module.exports = function (sequelize, DataTypes) {
    var menus = sequelize.define("menus", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        Info: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            // We're saying that we want our Author to have Posts
            classMethods: {
                associate: function (models) {
                    // An Author (foreignKey) is required or a Post can't be made
                    menus.belongsTo(models.restaurants, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        });

    return menus;
};