const signUpService = require("../services/signup");

async function signupUser(req, res){

    try{
        const userData = req.body;
        const user = await signUpService.signupUser(userData);
        res.status(201).json({user: {name:user.name,email:user.email }, message: "User created successfully"});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    signupUser
};