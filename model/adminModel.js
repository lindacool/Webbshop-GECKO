// const mongoose = require("mongoose");
// const joi = require("joi");

// const adminSchema = new mongoose.Schema({
//     userName: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 100
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 4,
//         maxlength: 200
//     }
// });

// const Admin = mongoose.model("Admin", adminSchema);


// function validateAdmin(admin){
//     const schema = {
//         userName:joi.string().min(5).max(100).required(),
//         password:joi.string().min(4).max(200)
//     }

//     return joi.validate(admin, schema);
// }



// module.exports.Admin = Admin;
// module.exports.validateAdmin = validateAdmin;