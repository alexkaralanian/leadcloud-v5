module.exports = (sequelize, DataTypes) => {
  const campaigns = sequelize.define(
    "campaigns",
    {
      title: DataTypes.STRING,
      listings: DataTypes.JSONB,
      groups: DataTypes.JSONB
    },
    {}
  );
  campaigns.associate = models => {
    campaigns.belongsTo(models.users, { as: "User" });
  };
  return campaigns;
};
