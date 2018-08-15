module.exports = (sequelize, DataTypes) => {
  const ListingContacts = sequelize.define(
    "ListingContacts",
    {
      listingId: DataTypes.STRING,
      contactId: DataTypes.STRING
    },
    {}
  );
  ListingContacts.associate = models => {
    // associations can be defined here
  };
  return ListingContacts;
};
