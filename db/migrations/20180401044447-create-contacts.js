module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("contacts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      googleId: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.JSONB
      },
      phone: {
        type: Sequelize.JSONB
      },
      address: {
        type: Sequelize.JSONB
      },
      images: {
        type: Sequelize.JSONB
      },
      membership: {
        type: Sequelize.JSONB
      },
      notes: {
        type: Sequelize.TEXT
      },
      updated: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable("contacts")
};
