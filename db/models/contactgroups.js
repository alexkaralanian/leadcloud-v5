module.exports = (sequelize, DataTypes) => {
  const ContactGroups = sequelize.define(
    "ContactGroups",
    {
      contactId: DataTypes.INTEGER,
      googleId: DataTypes.INTEGER
    },
    {}
  );
  ContactGroups.associate = models => {
    // associations can be defined here
  };
  return ContactGroups;
};
