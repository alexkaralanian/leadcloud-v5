module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("listings", "description", {
      type: Sequelize.TEXT
    })
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn("listings", "description")
  ]
};

