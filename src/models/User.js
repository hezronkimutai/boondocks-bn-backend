/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
