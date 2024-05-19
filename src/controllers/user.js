const userService = require("../services/user");

async function getUsers(req, res){
    try{    
        const users= await userService.getUsers();
        const result = users.map((user)=>{
            return { account:{ balance: user.account?.balance}, name:user.name, email: user.email, role: user.role }
        });
        res.json(result);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}

async function getUser(req,res){
    const { id } = req.loggedUser;
    try{
        const user = await userService.getUser(id);
        res.json({user:user,message:"User received."})
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

async function createMovement(req,res){
    
    const { id } = req.loggedUser;
    const { userId, movementType, amount, timestamp } = req.body;

    try{
        const user = await userService.createMovement({userId:userId, movementType:movementType, amount:amount, timestamp:timestamp, loggedUserId:id});
        res.status(201).json({user: user, message: "Movement created successfully"});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = { 
    getUsers,
    createMovement,
    getUser
}