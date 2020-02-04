module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('booking', {
    userId: DataTypes.INTEGER,
    hotelId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    arrivalDate: DataTypes.DATE,
    leavingDate: DataTypes.DATE,
  }, {});
  Booking.associate = (models) => {
    Booking.belongsTo(models.user, {
      allowNull: true,
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.hotel, {
      allowNull: true,
      foreignKey: 'hotelId',
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.room, {
      allowNull: true,
      foreignKey: 'roomId',
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.trip, {
      allowNull: true,
      foreignKey: 'tripId',
      onDelete: 'CASCADE'
    });
  };
  return Booking;
};
