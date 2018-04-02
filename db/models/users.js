module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
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
      googleRefreshToken: DataTypes.STRING
    },
    {}
  );
  users.associate = models => {
    // associations can be defined here
  };
  return users;
};
