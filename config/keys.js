if (process.env.NODE_ENV === "production") {
  const production = require("./prod");
  module.exports = production;
} else {
  const development = require("./dev");
  module.exports = development;
}
