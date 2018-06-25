module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("ContactGroups", {
      contactId: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("ContactGroups")
};
