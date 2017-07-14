'use strict';
module.exports = function(sequelize, DataTypes) {
  var Season = sequelize.define('Season', {
    year: DataTypes.INTEGER,
    id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Season;
};