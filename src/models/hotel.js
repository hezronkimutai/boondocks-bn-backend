module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('hotel', {
    locationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    services: DataTypes.STRING
  }, {});
  Hotel.associate = (models) => {
    Hotel.hasMany(models.booking, {
      foreignkey: 'hotelId',
      onDelete: 'CASCADE'
    });
    Hotel.hasMany(models.trip, {
      foreignkey: 'hotelId',
      onDelete: 'CASCADE'
    });
  };
  return Hotel;
};
