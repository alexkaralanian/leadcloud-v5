module.exports = (sequelize, DataTypes) => {
  const contacts = sequelize.define(
    "contacts",
    {
      googleId: DataTypes.STRING,
      fullName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.JSONB,
      phone: DataTypes.JSONB,
      address: DataTypes.JSONB,
      images: DataTypes.JSONB,
      membership: DataTypes.JSONB,
      organizations: DataTypes.JSONB,
      relationships: DataTypes.JSONB,
      websites: DataTypes.JSONB,
      notes: DataTypes.TEXT,
      updated: DataTypes.STRING
    },
    {}
  );
  contacts.associate = models => {
    // associations can be defined here
  };
  return contacts;
};
