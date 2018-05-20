module.exports = (sequelize, DataTypes) => {
  const ListingContact = sequelize.define(
    "ListingContact",
    {
      listingId: DataTypes.STRING,
      contactId: DataTypes.STRING
    },
    {}
  );
  ListingContact.associate = models => {
    // associations can be defined here
  };
  return ListingContact;
};
