module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("contactTags", "UserId", {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("contactTags", "organizations");
  }
};
