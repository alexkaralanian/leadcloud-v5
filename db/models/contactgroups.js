module.exports = (sequelize, DataTypes) => {
  const ContactGroups = sequelize.define(
    "ContactGroups",
    {
      groupId: DataTypes.STRING,
      contactId: DataTypes.STRING
    },
    {}
  );
  ContactGroups.associate = models => {
    // associations can be defined here
  };
  return ContactGroups;
};
