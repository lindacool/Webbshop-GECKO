const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");
const startPageRouter = require("./router/startPageRouting");
const productPageRouter = require("./router/productPageRouting");
const adminPageRouter = require("./router/adminPageRouting");
const detailProductPageRouter = require("./router/detailProductPageRouting");
const loginPopUpRouter = require("./router/loginPopUpRouting");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(
  productPageRouter,
  startPageRouter,
  adminPageRouter,
  detailProductPageRouter,
  loginPopUpRouter
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
