const User = require("../models/user");
const bcrypt = require("bcrypt");

async function signupUser(userData){
    const { name, email, password } = userData;
    if(!name || !email || !password) throw new Error("Invalid credentials information.");

    const existingUser = await User.findOne({email:email});
    if(existingUser){
        throw new Error("The user already exists. Please try to use another email.");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "customer",
        account:{
            balance:0,
            movements:[]
        }
    });

    const createdUser = await newUser.save(newUser);

    return createdUser;
}

module.exports = 
{
    signupUser
}