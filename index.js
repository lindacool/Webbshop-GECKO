const mongoose = require("mongoose");
const config = require("./config/config");









const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(config.databaseURL, options).then( () => {
    console.log(`connecting to port: ${PORT}...`);
    app.listen(PORT);
    console.log(`connection successful`);
});