module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("contactTags", "UserUuid", {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("contactTags", "organizations");
  }
};
