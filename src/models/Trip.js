module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('trip', {
    userId: DataTypes.INTEGER,
    hotelId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    leavingFrom: DataTypes.STRING,
    goingTo: DataTypes.STRING,
    travelDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    reason: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Trip.associate = (models) => {
    Trip.belongsTo(models.user, {
      foreignkey: 'userId',
      onDelete: 'CASCADE'
    });
    Trip.belongsTo(models.trip, {
      foreignkey: 'hotelId',
      onDelete: 'CASCADE'
    });
  };
  return Trip;
};
