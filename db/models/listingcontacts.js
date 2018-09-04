module.exports = (sequelize, DataTypes) => {
  const ListingContacts = sequelize.define(
    "ListingContacts",
    {
      listingId: DataTypes.INTEGER,
      contactId: DataTypes.INTEGER
    },
    {}
  );
  ListingContacts.associate = models => {
    // associations can be defined here
  };
  return ListingContacts;
};
