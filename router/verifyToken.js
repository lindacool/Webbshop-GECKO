const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{

  const token = req.cookies.jsonwebtoken;
  
  
  if(token) {
    //decode token och user info
    const user = jwt.verify(token, "secretkey");
    
   // console.log("user info" , user);
    req.user = user;
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