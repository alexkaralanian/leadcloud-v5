module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define(
    "groups",
    {
      googleId: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {}
  );
  groups.associate = models => {
    groups.belongsToMany(models.contacts, {
      through: {
        model: "ContactGroups"
      }
    });
    groups.belongsTo(models.users, { as: "User" });
  };
  return groups;
};
