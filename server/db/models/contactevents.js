module.exports = (sequelize, DataTypes) => {
  const ContactEvents = sequelize.define(
    "ContactEvents",
    {
      contactId: DataTypes.INTEGER,
      googleId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER
    },
    {}
  );
  ContactEvents.associate = models => {
    // associations can be defined here
  };
  return ContactEvents;
};
