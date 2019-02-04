module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn("listings", "unit_number", {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn("listings", "state", {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn("listings", "ownership_type", {
      type: Sequelize.ENUM("condo", "co-op", "cond-op", "single-family", "multi-family")
    }),
    queryInterface.addColumn("listings", "property_style", {
      type: Sequelize.ENUM("pre-war", "post-war", "new_development", "townhome", "brownstone")
    }),
    queryInterface.addColumn("listings", "priority", {
      type: Sequelize.ENUM("a", "b", "c")
    }),
    queryInterface.addColumn("listings", "category", {
      type: Sequelize.ENUM("sale", "rental")
    }),
    queryInterface.addColumn("listings", "listing_status", {
      type: Sequelize.ENUM("pending", "active", "accepted_offer", "contract_signed", "closed")
    }),
    queryInterface.addColumn("listings", "type", {
      type: Sequelize.ENUM("open", "exclusive", "co-broke", "off-market")
    }),
    queryInterface.addColumn("listings", "exclusive_start", {
      type: Sequelize.DATE
    }),
    queryInterface.addColumn("listings", "exclusive_end", {
      type: Sequelize.DATE
    }),
    queryInterface.addColumn("listings", "bedrooms", {
      type: Sequelize.ENUM("studio", "1br", "junior-4", "2br", "3br+")
    }),
    queryInterface.addColumn("listings", "bathrooms", {
      type: Sequelize.ENUM("1", "1.5", "2", "2.5", "3+")
    }),
    queryInterface.addColumn("listings", "asking_price", {
      type: Sequelize.INTEGER
    }),
    queryInterface.addColumn("listings", "closing_price", {
      type: Sequelize.INTEGER
    }),
    queryInterface.addColumn("listings", "gross_comission", {
      type: Sequelize.INTEGER
    })
  ],

  down: queryInterface => [
    queryInterface.removeColumn("listings", "unit_number"),
    queryInterface.removeColumn("listings", "ownership_type"),
    queryInterface.removeColumn("listings", "property_style"),
    queryInterface.removeColumn("listings", "priority"),
    queryInterface.removeColumn("listings", "category"),
    queryInterface.removeColumn("listings", "status"),
    queryInterface.removeColumn("listings", "listing_type"),
    queryInterface.removeColumn("listings", "exclusive_start"),
    queryInterface.removeColumn("listings", "exclusive_end"),
    queryInterface.removeColumn("listings", "bedrooms"),
    queryInterface.removeColumn("listings", "bathrooms"),
    queryInterface.removeColumn("listings", "asking_price"),
    queryInterface.removeColumn("listings", "closing_price"),
    queryInterface.removeColumn("listings", "gross_commission")
  ]
};
