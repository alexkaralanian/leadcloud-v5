module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("contacts", "UserId", {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("contacts", "organizations");
  }
};
