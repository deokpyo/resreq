module.exports = function (sequelize, DataTypes) {
    var reviews = sequelize.define("reviews", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            // We're saying that we want our Author to have Posts
            classMethods: {
                associate: function (models) {
                    // An Author (foreignKey) is required or a Post can't be made
                    reviews.belongsTo(models.restaurants, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        });

    return reviews;
};