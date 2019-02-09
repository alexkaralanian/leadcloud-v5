module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define("events", {}, {});
  events.associate = models => {
    // associations can be defined here
  };
  return events;
};
