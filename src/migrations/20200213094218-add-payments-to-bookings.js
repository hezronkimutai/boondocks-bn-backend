module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('bookings', 'paymentType', {
      type: Sequelize.ENUM,
      allowNull: false,
      values: [
        'paypal',
        'debit/credit_card',
        'cash',
        'unpaid'
      ],
      defaultValue: 'unpaid'
    }),
    queryInterface.addColumn('bookings', 'isPaid', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }),
    queryInterface.addColumn('bookings', 'amount', {
      allowNull: false,
      type: Sequelize.NUMERIC(10, 2),
      defaultValue: 0.00
    })
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('bookings', 'paymentType'),
    queryInterface.removeColumn('bookings', 'isPaid'),
    queryInterface.removeColumn('bookings', 'amount')
  ])
};
