module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("campaigns", "isDraft", {
      type: Sequelize.BOOLEAN
    })
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn("campaigns", "isDraft")
  ]
};
