module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("campaigns", "subject", {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("campaigns", "subject");
  }
};
