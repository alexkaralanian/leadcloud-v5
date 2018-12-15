const capitalize = string =>
  string
    .trim()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const cleanString = str =>
  str
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

module.exports = {
  cleanString,
  capitalize
};
