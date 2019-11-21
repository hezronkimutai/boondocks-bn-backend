module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    name: DataTypes.STRING
  }, {});
  Location.associate = () => {
  };
  return Location;
};
