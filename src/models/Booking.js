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
      foreignkey: 'userId',
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.hotel, {
      allowNull: true,
      foreignkey: 'hotelId',
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.room, {
      allowNull: true,
      foreignkey: 'roomId',
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.trip, {
      allowNull: true,
      foreignkey: 'tripId',
      onDelete: 'CASCADE'
    });
  };
  return Booking;
};
