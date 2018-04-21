module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({ error: "MUST BE LOGGED IN!" });
  }
  next();
};
