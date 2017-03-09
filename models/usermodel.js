module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define("users", {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        user_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        // password: {
        //     type: DataTypes.STRING
        // },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
        {
            // We're saying that we want our Author to have Posts
            classMethods: {
                associate: function (models) {
                    // Associating Author with Posts
                    // When an Author is deleted, also delete any associated Posts
                    users.hasMany(models.restaurants, {
                        onDelete: "cascade"
                    });
                }
            }
        });
    return users;
};