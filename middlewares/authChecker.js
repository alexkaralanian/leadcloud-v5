module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({ error: "Must be logged in!" });
  }
  next();
};
