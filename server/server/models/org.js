'use strict';
module.exports = function(sequelize, DataTypes) {
  var Org = sequelize.define('Org', {
    id: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Org.hasMany(models.Event, {
          foreignKey: 'orgId',
          as: 'events'
        });
      }
    }
  });
  return Org;
};
