module.exports = (sequelize, DataTypes) => {
  const listings = sequelize.define(
    "listings",
    {
      address: DataTypes.STRING,
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      images: DataTypes.JSONB,
      description: DataTypes.TEXT,
      updated: DataTypes.STRING,
      asking_price: DataTypes.INTEGER,
      closing_price: DataTypes.INTEGER,
      type: DataTypes.ENUM("sales", "rental"),
      priority: DataTypes.ENUM("A", "B", "C"),
      status: DataTypes.ENUM("pending", "active", "contract signed", "closed"),
      listing_type: DataTypes.ENUM(
        "open",
        "exclusive",
        "co-broke",
        "off-market"
      ),
      property_type: DataTypes.ENUM(
        "condo",
        "co-op",
        "townhome",
        "single-family",
        "multi-family"
      ),
      exclusive_start: DataTypes.DATE,
      exclusive_end: DataTypes.DATE
    },
    {}
  );
  listings.associate = models => {
    listings.belongsToMany(models.contacts, { through: "ListingContacts" });
    listings.belongsTo(models.users, { as: "User" });
  };
  return listings;
};
