module.exports = (req, res, next) => {
  console.log("REQ.SESSION", req.session);
  if (!req.session) {
    console.error("MUST BE LOGGED IN");
    res.status(401).send({ error: "MUST BE LOGGED IN!" });
  } else {
    next();
  }
};
