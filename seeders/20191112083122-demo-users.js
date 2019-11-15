import hash from '../src/utils/hash';

const passwordHash = hash.generateSync('12345678');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@barefoot.com',
    password: passwordHash,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
