const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const config = require("./config/config");
const productPageRouter = require('./router/productPageRouting');
const adminPageRouter = require('./router/adminPageRouting');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(productPageRouter);
app.use(adminPageRouter);





const PORT = process.env.PORT || 4000;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(config.databaseURL, options).then( () => {
    console.log(`connecting to port: ${PORT}...`);
    app.listen(PORT);
    console.log(`connection successful`);
});