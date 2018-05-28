module.exports = (sequelize, DataTypes) => {
  const listings = sequelize.define(
    "listings",
    {
      address: DataTypes.STRING,
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      zip: DataTypes.STRING,
      images: DataTypes.JSONB,
      updated: DataTypes.STRING
    },
    {}
  );
  listings.associate = models => {
    listings.belongsTo(models.users, { as: "User" });
    listings.belongsToMany(models.contacts, { through: "ListingContact" });
  };
  return listings;
};
