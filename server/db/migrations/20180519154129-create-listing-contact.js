module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("ListingContacts", {
      listingId: {
        type: Sequelize.STRING
      },
      contactId: {
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
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable("ListingContacts")
};
