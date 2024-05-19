const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");
const { verifyToken } = require("../utils/authMiddleware");

async function login(email, password){
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw new Error("User not found");
        }
        const isPasswordValid = bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            throw new Error("Incorrect password");
        }
        const token = generateToken(existingUser);
        return token;
    }catch(error){
        throw new Error ("Invalid credentials");
    }
}

async function refreshToken(oldToken){
    try{
        const decodedToken = verifyToken(oldToken);
        const user = await User.findById(decodedToken.id);
        if (!user){
            throw new error("User not found");
        };
        const newToken = generateToken(user);
        return newToken;
    }catch(error){
        throw new Error("Invalid token");
    }


}

module.exports = {
    login, refreshToken
}