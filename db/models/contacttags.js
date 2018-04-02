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
    // associations can be defined here
  };
  return contactTags;
};
