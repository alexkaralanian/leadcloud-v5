module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("users", "gContactsSyncToken", {
      type: Sequelize.STRING
    }),

    queryInterface.addColumn("users", "gGroupsSyncToken", {
      type: Sequelize.STRING
    })
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn("users", "gContactsSyncToken"),

    queryInterface.removeColumn("users", "gGroupsSyncToken")
  ]
};