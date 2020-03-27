const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const token = req.cookies.jsonwebtoken;

  if (token) {
    //decode token och user info
    const admin = jwt.verify(token, "secretkey");
    req.isAdmin = admin;
    next();
  } else {
    res.send("You are not authorised");
  }
}
