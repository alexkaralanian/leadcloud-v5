module.exports = (req, res, next) => {
  if (!req.session) {
    console.warn("MUST BE LOGGED IN");
    res.status(401).send({ error: "MUST BE LOGGED IN!" });
  } else {
    next();
  }
};
