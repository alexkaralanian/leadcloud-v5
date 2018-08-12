module.exports = (sequelize, DataTypes) => {
  const contacts = sequelize.define(
    "contacts",
    {
      googleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      phone: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      address: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      membership: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      organizations: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      relationships: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      websites: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      updated: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  contacts.associate = models => {
    contacts.belongsToMany(models.groups, { through: "ContactGroups" });
    contacts.belongsToMany(models.listings, { through: "ListingContacts" });
    contacts.belongsTo(models.users, { as: "User" });
  };
  return contacts;
};
