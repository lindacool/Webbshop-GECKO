const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");
const startPageRouter = require("./router/startPageRouting");
const productPageRouter = require("./router/productPageRouting");
const adminPageRouter = require("./router/adminPageRouting");
const detailProductPageRouter = require("./router/detailProductPageRouting");
const checkoutPageRouter = require("./router/checkoutPageRouting");
const loginRouter = require("./router/loginRouting");
const registerRouter = require('./router/registerRouting');
const adminUserRouter = require("./router/adminUserRouting");
const userProfileRouter = require('./router/userProfileRouting');
const resetPasswordRouter = require('./router/resetPasswordRouting');
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();


app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.use(
  resetPasswordRouter,
  registerRouter,
  productPageRouter,
  startPageRouter,
  adminPageRouter,
  detailProductPageRouter,
  loginRouter,
  adminUserRouter,
  userProfileRouter,
  checkoutPageRouter
);
app.use(
  sassMiddleware({
    src: path.join(__dirname, "css"),
    dest: path.join(__dirname, "scss")
  })
);

app.use("/public", express.static("public"));

const PORT = process.env.PORT || 4000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(config.databaseURL, options).then(() => {
  console.log(`connecting to port: ${PORT}...`);
  app.listen(PORT);
  console.log(`connection successful`);
});

module.exports = app;