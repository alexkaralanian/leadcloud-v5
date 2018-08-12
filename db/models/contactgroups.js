module.exports = (sequelize, DataTypes) => {
  const ContactGroups = sequelize.define(
    "ContactGroups",
    {
      groupId: DataTypes.INTEGER,
      contactId: DataTypes.INTEGER
    },
    {}
  );
  ContactGroups.associate = models => {
    // associations can be defined here
  };
  return ContactGroups;
};
