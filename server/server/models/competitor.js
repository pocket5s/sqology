'use strict';
module.exports = function(sequelize, DataTypes) {
  var Competitor = sequelize.define('Competitor', {
    id: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Competitor;
};
