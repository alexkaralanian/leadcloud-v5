module.exports = (sequelize, DataTypes) => {
  const contactTags = sequelize.define(
    "contactTags",
    {
      googleId: DataTypes.STRING,
      title: DataTypes.STRING
    },
    {}
  );
  contactTags.associate = models => {
    contactTags.belongsTo(models.users, { as: "User" });
  };
  return contactTags;
};
