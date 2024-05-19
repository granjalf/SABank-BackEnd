const mongoose = require("../config/dbConfig");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {type: String, enum: ["admin","customer"], default:"customer"},
    account:{
        balance: Number, 
        movements:[{
            movementType:{type:String, enum:["d","w"]},
            amount: Number,
            timestamp: Date,
            loggedUser: String
        }]},
});

module.exports = mongoose.model("User", userSchema);