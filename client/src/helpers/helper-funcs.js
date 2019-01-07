export const capitalize = string =>
  string
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const toLowerCase = string =>
  string
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();


export diff = () => {}
