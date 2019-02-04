module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("campaigns", "template", {
      type: Sequelize.JSONB
    })
  ],

  down: queryInterface => [queryInterface.removeColumn("campaigns", "step")]
};
