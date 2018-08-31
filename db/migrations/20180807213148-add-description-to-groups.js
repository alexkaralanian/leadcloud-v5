module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("groups", "description", {
      type: Sequelize.TEXT
    })
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn("groups", "description")
  ]
};
