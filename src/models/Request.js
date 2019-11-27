module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.user, {
      foreignkey: 'userId',
      onDelete: 'CASCADE'
    });
    Request.hasMany(models.trip, {
      foreignkey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
