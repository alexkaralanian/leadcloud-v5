module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.renameTable("contactTags", "groups"),

  down: (queryInterface, Sequelize) =>
    queryInterface.renameTable("groups", "contactTags")
};
