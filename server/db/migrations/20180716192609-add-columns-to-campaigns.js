module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("campaigns", "recipients", {
      type: Sequelize.JSONB
    }),

    queryInterface.addColumn("campaigns", "body", {
      type: Sequelize.TEXT
    })
  ],

  down: queryInterface => [
    queryInterface.removeColumn("campaigns", "recipients"),

    queryInterface.removeColumn("campaigns", "body")
  ]
};
