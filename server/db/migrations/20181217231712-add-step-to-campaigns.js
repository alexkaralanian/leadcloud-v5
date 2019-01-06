module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("campaigns", "template", {
      type: Sequelize.JSONB
    })
  ],

  down: (queryInterface, Sequelize) => [queryInterface.removeColumn("campaigns", "step")]
};
