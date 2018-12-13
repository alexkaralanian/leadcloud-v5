module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("contacts", "UserUuid", {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("contacts", "organizations");
  }
};
