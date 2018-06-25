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
    listings.belongsToMany(models.contacts, { through: "ListingContact" });
    listings.belongsTo(models.users, { as: "User" });
  };
  return listings;
};
