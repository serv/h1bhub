'use strict';
module.exports = (sequelize, DataTypes) => {
  const temp_table_2014 = sequelize.define('temp_table_2014', {
    data: DataTypes.JSONB
  }, {});
  temp_table_2014.associate = function(models) {
    // associations can be defined here
  };
  return temp_table_2014;
};