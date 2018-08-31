module.exports = (sequelize, DataTypes) => {
  const campaigns = sequelize.define(
    "campaigns",
    {
      title: DataTypes.STRING,
      subject: DataTypes.STRING,
      body: DataTypes.TEXT,
      listings: DataTypes.JSONB,
      recipients: DataTypes.JSONB,
      groups: DataTypes.JSONB,
      isDraft: DataTypes.BOOLEAN
    },
    {}
  );
  campaigns.associate = models => {
    campaigns.belongsTo(models.users, { as: "User" });
  };
  return campaigns;
};
