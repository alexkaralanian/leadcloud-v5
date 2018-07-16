module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("campaigns", "recipients", {
      type: Sequelize.JSONB
    })
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn("campaigns", "recipients")
  ]
};
