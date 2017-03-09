module.exports = function (sequelize, DataTypes) {
  var events = sequelize.define("events", {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    event_url: {
      type: DataTypes.TEXT
    },
    event_type: {
      type: DataTypes.STRING,
      defaultValue: "event-success"
    },
    event_start_time: {
      type: DataTypes.BIGINT
    },
    event_end_time: {
      type: DataTypes.BIGINT
    },
    owner_email: {
      type: DataTypes.STRING
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function (models) {
          // An Author (foreignKey) is required or a Post can't be made
          events.belongsTo(models.restaurants, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });
  return events;

};