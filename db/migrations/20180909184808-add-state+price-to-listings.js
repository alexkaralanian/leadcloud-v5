module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("listings", "house_number", {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn("listings", "unit_number", {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn("listings", "state", {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn("listings", "asking_price", {
      type: Sequelize.INTEGER
    }),
    queryInterface.addColumn("listings", "closing_price", {
      type: Sequelize.INTEGER
    }),
    queryInterface.addColumn("listings", "category", {
      type: Sequelize.ENUM("sales", "rental")
    }),
    queryInterface.addColumn("listings", "priority", {
      type: Sequelize.ENUM("A", "B", "C")
    }),
    queryInterface.addColumn("listings", "status", {
      type: Sequelize.ENUM("pending", "active", "contract signed", "closed")
    }),
    queryInterface.addColumn("listings", "listing_type", {
      type: Sequelize.ENUM("open", "exclusive", "co-broke", "off-market")
    }),
    queryInterface.addColumn("listings", "property_type", {
      type: Sequelize.ENUM(
        "condo",
        "co-op",
        "townhome",
        "single-family",
        "multi-family"
      )
    }),
    queryInterface.addColumn("listings", "exclusive_start", {
      type: Sequelize.DATE
    }),
    queryInterface.addColumn("listings", "exclusive_end", {
      type: Sequelize.DATE
    })
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn("listings", "state"),
    queryInterface.removeColumn("listings", "house_number"),
    queryInterface.removeColumn("listings", "unit_number"),
    queryInterface.removeColumn("listings", "asking_price"),
    queryInterface.removeColumn("listings", "closing_price"),
    queryInterface.removeColumn("listings", "category"),
    queryInterface.removeColumn("listings", "priority"),
    queryInterface.removeColumn("listings", "status"),
    queryInterface.removeColumn("listings", "listing_type"),
    queryInterface.removeColumn("listings", "property_type"),
    queryInterface.removeColumn("listings", "exclusive_start"),
    queryInterface.removeColumn("listings", "exclusive_end")
  ]
};
