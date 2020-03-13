//fannys user-router

const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
const config = require("../config/config");
const verifytoken = require("./verifytoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const router = express.Router();

//vår mailserver-kommunikation och vår nyckel auktoriseras här 
const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.mailkey
    }
}))



// ------------- HOME ------------------------------------- // 

router.get("/startsida", verifytoken, (req, res) => {
    res.send("Hej, du lyckades logga in!")
})


// --------------- SIGN UP ROUTES ------------------------- // 

router.get("/signUp", (req, res) => {
    res.render("signup.ejs")
})

router.post("/signUp", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //console.log(hashPassword)
    const user = await new User({
        email: req.body.email,
        password: hashPassword
    }).save();

    //skickar mail till användaren genom dennes mail 
    //går det att använda promise istyället? så att man kör en .then.catch()
    await transport.sendMail({
        to: "f.vforsman@gmail.com", //skicka till user.email, det som skrivs in 
        from: "f.vforsman@gmail.com", //man kan ha en no-reply här <no-reply>Namnet 
        subject: "Hello sir/madame",
        html: "<h1>Välkommen " + user.email + "</h1>"
    });

    //console.log(user)
    //redirect letar efter en route, render gör en fil 
    res.send("du är registrerad"); //eller redirecta till homedirectory / 
})


// ----------------------------------- LOG IN EXISTING USER --------------------------- // 

router.get("/login", (req, res) => {
    //användarens info
    res.render("login.ejs")
    // jämföra med databas info.
})

//här använder vi webtoken 
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.loginEmail });
    if (!user) return res.redirect("/signup")

    const validUser = await bcrypt.compare(req.body.loginPassword, user.password)

    //if-else som ger användare token 
    if (!validUser) return res.redirect("/login")
    else {
        //payload är user-objektet 
        //secret key, extrainfo som ökar säökerhet
        //om användare matat in rätt lösenord skapa en token     
        jwtoken.sign({ user }, "secretkey", (error, token) => {
            //för enkelhet - vi skickar med token genom send
            //glöm ej att sen hantera error! 
            if (error) return res.redricet("/login");
            // localStorage.setItem("JSONWEBTOKEN", token)
            if (token) {
                const cookie = req.cookies.jsonwebtoken;
                if (!cookie) {
                    //samma namn som finns i req.cookie skickas här till användare som ej har cookiue
                    //skickar med cookie
                    //hur länge den ska gälla - och bara genom http-request
                    res.cookie("jsonwebtoken", token, { maxAge: 3600000, htttpOnly: true })
                }
                res.render("userProfile", { user });  //när användare loggar in får man ett tokennr 
                //genomn cookies eller local storage vill vi spara till frontend sen!
            }
            //om det blir error med cookies, skicka användaren till login 
            res.redirect("/login");
        })

    }

})

//vi skapar en route för att kunna resetta password

router.get("/reset", (req, res) => {
    res.render("reset")
})

router.post("/reset", async (req, res) => {

    crypto.randomBytes(32, async (error, token) => {
        if (error) return res.redirect("/signup");

        //token konverteras till en string med hexadecimaler  
        const resetToken = token.toString("hex");

        //om användaren finns, skapa en resettoken och ett exipration date 
        // userReset.resetToken = resetToken; 
        // userReset.tokenExpiration = Date.now() + 1000000 //"skapa ett expiration date"
        // await userReset.save(); 

        //kontrollera om användaren finns genom mailen som matades in 
        User.findOne({ email: req.body.resetMail })
            .then(user => {
                if (!user) return res.redirect("/signup")
                user.resetToken = resetToken
                user.tokenExpiration = Date.now() + 1000000
                return user.save(); 
            
            })
            .then(res => {
                console.log(res + "testar res"); 
                transport.sendMail({
                    to: "f.vforsman@gmail.com", //skicka till user.email, det som skrivs in 
                    from: "f.vforsman@gmail.com", //man kan ha en no-reply här <no-reply>Namnet 
                    subject: "Hello sir/madame",
                    html: `http://localhost:8003/reset/${resetToken} Här är din reset-länk!`
                });
                
            }) 
            return res.redirect("/")
    })


    //om den inte finns skicka till signup sidan 
    // if(!userReset) return res.redirect("/signup")

    //här skapar vi crypto för token
    //vi skapar en random 32-bytes token 
})

//här gör vi en get-request för URL reset Token 
router.get("/reset/:token", async (req, res) => {

    const token = req.params.token;
    console.log(typeof token);
    const user = await User.findOne({ resetToken: token });
    console.log(user);
    res.render("resetForm", {user}) 

})

router.post("/reset/:token", async (req, res)=> {

   const user = await User.findOne({ resetToken: req.body.token })
   if(user) {
    const hashPassword = await bcrypt.hash(req.body.password, 10); user.password = hashPassword; user.resetToken = undefined; await user.save(); 
   }

   res.redirect("/login"); 

})

//--------------- Här gör vi en get request med vår verifytoken -------------

//router där vi skickar med verifytoken, 
//verifytoken är importerad där uppe, så att vi här kan använda den  
// router.get("/products", verifytoken, (req,res)=> {
//     res.send("You have authorization"); 
// }); 

//vår logut route är här 
router.get("/logout", (req, res) => {
    //innan man skickjas tillbaka till login så ska vi rensa cookies 
    res.clearCookie("jsonwebtoken").redirect("/login");
})


module.exports = router;