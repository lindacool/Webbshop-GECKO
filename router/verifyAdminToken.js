const jwt = require("jsonwebtoken");

<<<<<<< HEAD
module.exports = (req, res, next)=>{

  const token = req.cookies.jsonwebtoken;

  if(token) {
    //decode token och user info
    const admin = jwt.verify(token, "secretkey");
    console.log("user info" , admin);
    req.admin = admin;
    next();
  }
  else {
    res.send("You are not authorised");
  }
}
//req.cookies.jsonwebtoken
  // kollar om användare har cookies 
  // jwt verifiering metod  för att kolla om det är en valid cookies
  // validerings data till server 
  // next()
=======
module.exports = (req, res, next) => {

  const token = req.cookies.jsonwebtoken;

  if (token) {
    //decode token och user info
    const admin = jwt.verify(token, "secretkey");
    console.log("user info", admin);
    req.isAdmin = admin;
    next();
  } else {
    res.send("You are not authorised");
  }
}
>>>>>>> e0c86e0dcc829f2e71cd414b7f38827af3e28393
