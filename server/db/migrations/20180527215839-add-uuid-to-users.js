"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // queryInterface.removeColumn("users", "id");

    queryInterface.addColumn("users", "uuid", {
      type: Sequelize.UUID,
      primaryKey: true
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("users", "uuid");
  }
};
