module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("contacts", "organizations", {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn("contacts", "relationships", {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn("contacts", "websites", {
      type: Sequelize.STRING
    })
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn("contacts", "organizations"),
    queryInterface.removeColumn("contacts", "relationships"),
    queryInterface.removeColumn("contacts", "websites")
  ]
};
