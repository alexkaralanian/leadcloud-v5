module.exports = (sequelize, DataTypes) => {
  const listings = sequelize.define(
    "listings",
    {
      updated: DataTypes.DATE,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      unit_number: DataTypes.STRING,
      ownership_type: DataTypes.ENUM("condo", "co-op", "condop", "single-family", "multi-family"),
      property_style: DataTypes.ENUM(
        "pre-war",
        "post-war",
        "new_development",
        "townhome",
        "brownstone"
      ),
      images: DataTypes.JSONB,
      description: DataTypes.TEXT,
      priority: DataTypes.ENUM("a", "b", "c"),
      category: DataTypes.ENUM("sale", "rental"),
      listing_status: DataTypes.ENUM(
        "pending",
        "active",
        "accepted_offer",
        "contract_signed",
        "closed"
      ),
      listing_type: DataTypes.ENUM("open", "exclusive", "co-broke", "off-market"),
      exclusive_start: DataTypes.DATE,
      exclusive_end: DataTypes.DATE,
      bedrooms: DataTypes.ENUM("studio", "1br", "junior-4", "2br", "3br+"),
      bathrooms: DataTypes.ENUM("1", "1.5", "2", "2.5", "3+"),
      asking_price: DataTypes.INTEGER,
      closing_price: DataTypes.INTEGER,
      gross_commission: DataTypes.INTEGER
    },
    {}
  );
  listings.associate = models => {
    listings.belongsToMany(models.contacts, { through: "ListingContacts" });
    listings.belongsTo(models.users, { as: "User" });
  };
  return listings;
};
