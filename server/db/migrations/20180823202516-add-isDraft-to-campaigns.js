module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("campaigns", "isDraft", {
      type: Sequelize.BOOLEAN
    })
  ],

  down: queryInterface => [queryInterface.removeColumn("campaigns", "isDraft")]
};
