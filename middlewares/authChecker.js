const authCheck = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("NOT AUTHENTICATED");
  res.redirect("/");
};
