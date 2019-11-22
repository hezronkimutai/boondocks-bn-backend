module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    name: DataTypes.STRING
  }, {});
  Location.associate = (/* models */) => {
    // associations can be defined here
  };
  return Location;
};
