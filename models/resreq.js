module.exports = function (sequelize, DataTypes) {
  var restaurants = sequelize.define("restaurants", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    hour: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function (models) {
          // An Author (foreignKey) is required or a Post can't be made
          restaurants.belongsTo(models.users, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return restaurants;
};