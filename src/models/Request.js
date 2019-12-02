module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Request.hasMany(models.trip, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE'
    });
    Request.hasMany(models.comment, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
