module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("groups", "description", {
      type: Sequelize.TEXT
    })
  ],

  down: queryInterface => [queryInterface.removeColumn("groups", "description")]
};
