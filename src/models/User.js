export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User.hasMany(models.booking, {
      foreignkey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.hotel, {
      foreignkey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
