'use strict';
module.exports = function(sequelize, DataTypes) {
  var Judge = sequelize.define('Judge', {
    id: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Judge;
};
