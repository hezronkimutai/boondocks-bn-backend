export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'requester',
      values: [
        'super_administrator',
        'travel_administrator',
        'travel_team_member',
        'manager',
        'requester'
      ]
    }
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
