module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    role: {
      type: Sequelize.ENUM,
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
  }),
  down: queryInterface => queryInterface.dropTable('users')
};
