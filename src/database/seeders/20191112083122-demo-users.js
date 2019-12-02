const hash = require('bcrypt');
const config = require('../../config');

const passwordHash = hash.hashSync('12345678jfhyry', config.HASH_SALT_ROUNDS);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'Super',
    lastName: 'Administrator',
    email: 'super@administrator.com',
    password: passwordHash,
    role: 'super_administrator',
    isVerified: true,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
