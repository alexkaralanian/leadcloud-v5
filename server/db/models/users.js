module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      username: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      googleId: DataTypes.STRING,
      googlePhoto: DataTypes.STRING,
      googleAccessToken: DataTypes.STRING,
      googleRefreshToken: DataTypes.STRING,
      gContactsSyncToken: DataTypes.STRING,
      gGroupsSyncToken: DataTypes.STRING
    },
    {}
  );
  users.associate = models => {
    // associations can be defined here
  };
  return users;
};