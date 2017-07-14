'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INT,
    date: DataTypes.DATE,
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.Org, {
          foreignKey: 'eventId',
          onDelete: 'CASCADE
        });
      }
    }
  });
  return Event;
};
