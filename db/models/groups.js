module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define(
    "groups",
    {
      googleId: {
        type: DataTypes.STRING
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {}
  );
  groups.associate = models => {
    groups.belongsToMany(models.contacts, { through: "ContactGroups" });
    groups.belongsTo(models.users, { as: "User" });
  };
  return groups;
};
