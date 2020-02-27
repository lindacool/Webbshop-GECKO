const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const router = require('./router/productPageRouting');
const app = express();

app.set('view engine', 'ejs')

app.use(router)





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