module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('room', {
    hotelId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Room.associate = (models) => {
    Room.hasOne(models.booking, {
      foreignkey: 'roomId',
      onDelete: 'CASCADE'
    });
  };
  return Room;
};
