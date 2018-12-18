module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("campaigns", "step", {
      type: Sequelize.INTEGER
    })
  ],

  down: (queryInterface, Sequelize) => [queryInterface.removeColumn("campaigns", "step")]
};
