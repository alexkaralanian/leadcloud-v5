module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("contacts", "priority", {
      type: Sequelize.ENUM,
      values: ["a", "b", "c"]
    }),
    queryInterface.addColumn("contacts", "type", {
      type: Sequelize.ENUM,
      values: ["buyer", "seller", "landlord", "tenant"]
    }),
    queryInterface.addColumn("contacts", "income", {
      type: Sequelize.INTEGER
    }),
    queryInterface.addColumn("contacts", "creditScore", {
      type: Sequelize.INTEGER
    }),
    queryInterface.addColumn("contacts", "budget", {
      type: Sequelize.RANGE(Sequelize.INTEGER)
    }),
    queryInterface.addColumn("contacts", "netWorth", {
      type: Sequelize.BIGINT
    })
  ],

  down: queryInterface => [
    queryInterface.removeColumn("contacts", "priority"),
    queryInterface.removeColumn("contacts", "type"),
    queryInterface.removeColumn("contacts", "income"),
    queryInterface.removeColumn("contacts", "creditScore"),
    queryInterface.removeColumn("contacts", "budget"),
    queryInterface.removeColumn("contacts", "netWorth")
  ]
};
