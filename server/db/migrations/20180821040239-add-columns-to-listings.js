module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("listings", "description", {
      type: Sequelize.TEXT
    })
  ],

  down: queryInterface => [queryInterface.removeColumn("listings", "description")]
};
